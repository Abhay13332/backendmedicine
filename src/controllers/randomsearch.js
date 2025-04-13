import {medicine} from "../models/medicine.js";
import {redis} from "../sync/redis.js";
import redis_exp from "redismn";
import mongoose from "mongoose";
import {querytomodel} from "./pagesearchandmedicsearch.js";

export const getrandomdata=async (model_details,size=10)=>{
    let data=await (model_details[0]).aggregate([
        { $match:{img:{$ne:"https://onemg.gumlet.io/l_watermark_346,w_120,h_120/a_ignore,w_120,h_120,c_fit,q_auto,f_auto/hx2gxivwmeoxxxsc1hix.png"} }},
        {
           $sample:{size:size},
        },
        {
            $project:{
                [model_details[2]]:1,
                price:1,
                img:1,
            }
        }
    ]);
return data;
}
export const getrandom=async (req,res)=>{
    console.log("hj");
    let model_name=req.body.query;
    let size=req.body.size;
    console.log("hj"+model_name);

    let model_details=querytomodel(model_name);
   let result = await  getrandomdata(model_details,size);
   res.send(result);


}

export const pagination=async (page,pagesize,model,keyname)=>{
const skip=(page-1)*pagesize;
let datainpage=await model.aggregate([
    {   $project:{
            keyname :1,
            price:1,
            image:1,
        }
    },
    {
        $skip:skip,
    },
    {
        $limit:pagesize,
    }
]);

}
