import {injection} from "../models/injection.js";
import {medicine} from "../models/medicine.js";
import {capsule} from "../models/capsule.js";
import {syrup} from "../models/syrup.js";
import {healthysnacks} from "../models/healthysnacks.js";
import {vitamin} from "../models/vitamins.js";
import {protein} from "../models/proteins.js";
import {ayurvedic} from "../models/ayurvedic.js";
import {redis} from "../sync/redis.js";
import redis_exp from "redismn";

// implementation of mongoose search
export const mongosearch= async (query,searchterm)=>{
    let medres= await  search(medicine,"tabletname",query);
    if(medres.length>15){
        return medres;
    }
    const capres=await search(capsule,"capsulename",query);
    medres=[...medres,...capres];
    if(medres.length>15){
        return medres;
    }
    const injecres=await search(injection,"injectionname",query);
    medres=[...medres,...injecres];
    if(medres.length>15){
        return medres;
    }
    const syrres=await search(syrup,"syrupname",query);
    medres=[...medres,...syrres];
    if(medres.length>15){
        return medres;
    }
    const vitres=await search(vitamin,"vitaminname",query);
    medres=[...medres,...vitres];
    if(medres.length>15){
        return medres;
    }
    const snackres=await search(healthysnacks,"healthysnacksname",query);
    medres=[...medres,...snackres];
    if(medres.length>15){
        return medres;
    }
    const prores=await search(protein,"proteinname",query);
    medres=[...medres,...prores];
    if(medres.length>15){
        return medres;
    }
    const ayurres=await search(ayurvedic,"ayurvedicname",query);
    return medres=[...medres,...ayurres];

}
 const search=async (model,key,searchterm)=>{

        const result=await model.aggregate([
            {
                $match:{
                    [key]:{$regex:`^${searchterm}`,$options:"i"},
                },
            },
            {$limit:8},
            {
                $group:{
                    _id:null,
                    resultarr:{$push:`$${key}`},
                    img:{$push:"$img"}
                }
            },
        ]);
        console.log(result+"resultsearchbar");
        if (result[0]){
        return result[0].resultarr;}
        else return [];
}

// implementation of redis search
export const redissearch= async (name)=>{
  return await  redis.jsongetAll(name,"search")
}

export const redisset= async (name,searcharr,)=>{
   return await  redis.jsonset(name,searcharr,"search",180)
}

export const searchbarquery=async (req,res)=>{
    const query=req.body.query;
   const result= await redissearch(query);
   if(result){
        res.send(result);
       // console.log("redisused")
   }else{
       const mongodbresult=await mongosearch(query);
       // console.log(mongodbresult);
       redisset(query,mongodbresult);
       res.send(mongodbresult);
       console.log("mongodbused");
   }
}
