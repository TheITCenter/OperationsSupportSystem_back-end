const { Schema, model} = require('mongoose');

const EstadoDelTrabajoSchema = Schema({
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
        //required:true
        //unique:true,
    },
    workstation_id:{
        type:String,
        //required:true
        //unique:true,
    },
    operario_id:{
        type:String,
       // required:true
        //unique:true,
    },


})
module.exports = model('EstadoDelTrabajo', EstadoDelTrabajoSchema);