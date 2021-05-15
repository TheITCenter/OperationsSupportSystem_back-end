const { Schema, model} = require('mongoose');

const OperarioSchema = Schema({
    estado:{
        type:String,
        required:true,
    },
    nombre:{
        type:String,
        required:true
    },
    fecha_de_inicio:{
        type:Date,
        required:true
        //unique:true,
    },
    fecha_de_termino:{
        type:Date,
       // required:true
        //unique:true,
    },
    foto:{
        type:String,
       // required:true,
    },
    lote_id:{
        type:String,
        //required:true,
    },
    workStation_id:{
        type:String,
        //required:true,
    }

})
module.exports = model('Operario', OperarioSchema);