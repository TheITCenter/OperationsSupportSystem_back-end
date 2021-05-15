const { Schema, model} = require('mongoose');

const LoteSchema = Schema({
    cantidad_producida:{
        type:String,
       // required:true
        //unique:true,
    },
    fecha_de_termino:{
        type:Date,
       // required:true
        //unique:true,
    },
    multimedia_N:{
        type:String,
       // required:true
        //unique:true,
    },
    producto_id:{
        type:String,
      //  required:true
        //unique:true,
    },
    n_muestra:{
        type:String,
       // required:true
        //unique:true,
    },
    fecha_muestreo:{
        type:Date,
       // required:true
        //unique:true,
    },
    resultado:{
        type:String,
       // required:true
        //unique:true,
    },

})
module.exports = model('Lote', LoteSchema);