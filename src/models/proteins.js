import mongoose from "mongoose";
import {redis} from "../sync/redis.js";
const proteinSchema = mongoose.Schema({
    proteinname:{
        type:String,
        unique:true,
        required:true,
    },
    price:Number,
    image:String,
    ingredients:[String],
    benefits:[String],

});
export const protein=mongoose.model("protein",proteinSchema);
redis.jsonSchemaIdx("protein",[{
    key_name:"proteinname",
    tag_type:"TEXT",
}])