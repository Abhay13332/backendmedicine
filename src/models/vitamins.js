import mongoose from "mongoose";
import {redis} from "../sync/redis.js";
const vitaminSchema = mongoose.Schema({
    vitaminname:{
        type:String,
        unique:true,
        required:true,
    },
    price:Number,
    image:String,
    ingredients:[String],
    benefits:[String],

});
export const vitamin=mongoose.model("vitamin",vitaminSchema);
redis.jsonSchemaIdx("vitamin",[{
    key_name:"vitaminname",
    tag_type:"TEXT",
}])