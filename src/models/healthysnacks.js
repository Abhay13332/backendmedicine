import mongoose from "mongoose";
import {redis} from "../sync/redis.js";
const healthysnacksSchema = mongoose.Schema({
    healthysnacksname:{
        type:String,
        unique:true,
        required:true,
    },
    price:Number,
    image:String,
    ingredients:[String],
    benefits:[String],
    brief:String,

});
export const healthysnacks=mongoose.model("healthysnacks",healthysnacksSchema);
redis.jsonSchemaIdx("healthysnacks",[{
    key_name:"healthysnacksname",
    tag_type:"TEXT",
}])