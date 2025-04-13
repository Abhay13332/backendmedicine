import mongoose from 'mongoose';
import {redis} from "../sync/redis.js";

const MedicineSchema=mongoose.Schema({
    tabletname:{
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
export const medicine=mongoose.model('medicine',MedicineSchema);
redis.jsonSchemaIdx("medicine", [{
    "key_name":"tabletname",
    "tag_type":"TEXT",
    "sortable":true,

},{
    "key_name":"composition",
    "tag_type":"TEXT",

}]);