import mongoose from "mongoose";
import {redis} from "../sync/redis.js";

const capsuleSchema=mongoose.Schema({
    capsulename:{
        type:String,
        unique:true,
        required:true,
        index:true,
    },
    prescription:String, //required or not
    marketer:String,
    composition:String,
    price:Number,
    img:String,
    data:{
        type:mongoose.Types.ObjectId,
        ref:'mdata',
    }
});
export const capsule=mongoose.model('capsule',capsuleSchema);
redis.jsonSchemaIdx("capsule", [{
    "key_name":"capsulename",
    "tag_type":"TEXT",
    "sortable":true,

},{
    "key_name":"composition",
    "tag_type":"TEXT",

}]);
