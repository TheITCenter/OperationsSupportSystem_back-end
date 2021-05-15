const { Schema, model} = require('mongoose');

const IncidenteSchema = Schema({
    incidente:{
        type:String,
        required:true
        //unique:true,
    },
    razon:{
        type:String,
        required:true
        //unique:true,
    },
    fecha_de_inicio:{
        type:Date,
       // required:true
        //unique:true,
    },
    fecha_de_termino:{
        type:Date,
       // required:true
        //unique:true,
    },
    multimedia:{
        type:String,
        //required:true
        //unique:true,
    },
    lote_id:{
        type:String,
        //required:true
        //unique:true,
    },

})
module.exports = model('Incidente', IncidenteSchema);