import mongoose from "mongoose";
import {redis} from "../sync/redis.js";
const syrupSchema=mongoose.Schema({
    syrupname:{
        type:String,
        unique:true,
        required:true
    },
    prescription:String, //required or not
    marketer:String,
    composition:String,
    price:Number,
    img:String,
    quantity:Number,
    data:{
        type:mongoose.Types.ObjectId,
        ref:'mdata',
    }
})
export const syrup=mongoose.model('syrup',syrupSchema);
redis.jsonSchemaIdx("syrup", [{
    "key_name":"syrupname",
    "tag_type":"TEXT",
    "sortable":true,

},{
    "key_name":"composition",
    "tag_type":"TEXT",

}]);