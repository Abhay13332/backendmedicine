import {trycatchexec} from "../utils/trycatchhandler.js";
import {redis} from "../sync/redis.js";
import {querytomodel} from "./pagesearchandmedicsearch.js";

const redisgetbyname=async (queryname,model_details)=>{

    let result =await redis.jsonquery(model_details[2],queryname,model_details[1],(result,resultarr)=>{
        if (result==null|| result.length==0){
            return;
        }
        console.log(result);
        for (let i = 1; i < result.length - 1; i += 2) {
            resultarr.push( JSON.parse(result[i + 1][1]))
        }
    })
    return result;
}

const mongosearchmedic=async(query,model_details)=>{

    let keyname=model_details[2]
    return (await model_details[0].findOne({[keyname]:query}).populate("data"))


}
const addredismedic=async(document,model_details)=>{
    let  resultpushable=document ;
    console.log(resultpushable);
    const whereagg=redis.where(model_details[1],5*60);

        whereagg.jsonset(resultpushable[model_details[2]],resultpushable);

    await whereagg.exec();
}
export const medicsearch=async (req,res)=>{
    let query =req.body.query ;

    let model_details=querytomodel(query);

    let redisres=await redisgetbyname(query,model_details);
    // let redisres=[]
    if(redisres.length!=0){
        res.send(redisres[0])
    console.log(redisres[0]);
    console.log("redis used in redisres")

    }else{
        let mongodbres=await trycatchexec(mongosearchmedic,(err)=>{console.log(err.message,"mongosearch")},query,model_details);

        if (mongodbres){
            res.send(mongodbres);

            trycatchexec(addredismedic,(err)=>{console.log(err.message,"redisadd")},mongodbres,model_details)

        }else{
            res.send(null)
        }
        console.log("mongodb used")
    }

}

