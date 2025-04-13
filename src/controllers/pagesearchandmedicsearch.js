import {capsule} from "../models/capsule.js";
import {medicine} from "../models/medicine.js";
import {injection} from "../models/injection.js";
import {syrup} from "../models/syrup.js";
import {mdata} from "../models/mdata.js";
import {healthysnacks} from "../models/healthysnacks.js";
import {ayurvedic} from "../models/ayurvedic.js";
import {vitamin} from "../models/vitamins.js";
import mongoose from "mongoose";
import {redis} from "../sync/redis.js";
import {trycatchexec, trycatchhandler} from "../utils/trycatchhandler.js";
import {errorHandler} from "ioredis/built/redis/event_handler.js";
 export const querytomodel=(query)=>{
    if (query.toLowerCase().search("tablet")!=-1){
        return [medicine,"medicine","tabletname"];
    }else if(query.toLowerCase().search("capsule")!=-1){
        return [capsule,"capsule","capsulename"];
    }else if (query.toLowerCase().search("injection")!=-1){
        return [injection,"injection","injectionname"];
    }else if (query.toLowerCase().search("syrup")!=-1) {
        return [syrup,"syrup","syrupname"];
    }else{
        return [medicine,"medicine","tabletname"];
    }
};

 export const redisgetcomp=async (query,model_details)=>{

const luacsript=`

local medicname =KEYS[1]
local model_name=KEYS[2]
local key=KEYS[3]
local QUERYMEDIC="@" .. key .. ":" .. medicname
local medicdetails=redis.call("FT.SEARCH",model_name,QUERYMEDIC)
if (medicdetails[3]==nil) then
return medicdetails;
else
medicdetails=cjson.decode(medicdetails[3][2])
local compo=medicdetails["composition"]
local compquery="@composition:" .. compo
local result=redis.call("FT.SEARCH",model_name,compquery)
return (result)
end

`
     let medicdetails=(await redis.client.eval(luacsript,3,query, model_details[1],model_details[2]));
     const finalres=[]
     for (let i = 1; i < medicdetails.length - 1; i += 2) {
         finalres.push( JSON.parse(medicdetails[i + 1][1]))
     }
console.log(finalres);
return finalres;
}
 const redisgetbyname=async (queryname,model_details)=>{

    let result =await redis.jsonquery(model_details[2],queryname,model_details[1],(result,resultarr)=>{
        if (result==null|| result.length==0){
            return;
        }

        for (let i = 1; i < result.length - 1; i += 2) {
            resultarr.push( JSON.parse(result[i + 1][1]))
        }
    })
    return resultarr;
}
 const mongosearchpage=async(query,model_details,)=>{

    let keyname=model_details[2]
    let currentmedicine=(await model_details[0].findOne({[keyname]:query}))
     if (currentmedicine) {
         return await model_details[0].find({composition:currentmedicine['composition']})
     }else{
         return [];
     } ;

}
 const addredis=async(document,model_details)=>{
   let  resultpushable=await model_details[0].populate(document,{path:"data"}) ;
   const whereagg=redis.where(model_details[1],5*60);
   resultpushable.forEach(item=>{
       whereagg.jsonset(item[model_details[2]],item,model_details[1]);
   })
    await whereagg.exec();
}

export const mainpagesearch=async (req,res)=>{
    let query =req.body.query ;

    let model_details=querytomodel(query);

    let redisres=await redisgetcomp(query,model_details);
    // let redisres=[]
    console.log(redisres);
    if(redisres.length!=0){
        res.send(redisres)
        console.log("redisres")

    }else{
        let mongodbres=await trycatchexec(mongosearchpage,(err)=>{console.log(err.message,"mongosearch")},query,model_details);

        if (mongodbres){
            res.send(mongodbres);

            trycatchexec(addredis,(err)=>{console.log(err.message,"redisadd")},mongodbres,model_details)

        }else{
            res.send([])
        }
        console.log("mongodb used")
    }

}


