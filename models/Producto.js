const { Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    color:{
        type:String,
        required:true
        //unique:true,
    },
    impresion:{
        type:String,
        required:true
        //unique:true,
    },
    t_fabricacion:{
        type:String,
        required:true
        //unique:true,
    },
    dimensiones:{
        type:String,
        required:true
        //unique:true,
    },
    lote_id:{
        type:String,
        //required:true
        //unique:true,
    },

})
module.exports = model('Producto', ProductoSchema);