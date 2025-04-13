import mongoose from "mongoose";
import {redis} from "../sync/redis.js";
const ayurvedicSchema = mongoose.Schema({
        name:{
        type:String,
        unique:true,
        required:true,
    },
    price:Number,
    image:String,
    composition:[String],
    brief:String,

});
export const ayurvedic=mongoose.model("ayurvedic",ayurvedicSchema);
// console.log((await ayurvedic.find({})).length);