const { Schema, model} = require('mongoose');

const WorkStationSchema = Schema({
    tipo:{
        type:String,
        required:true
        //unique:true,
    },
    estado:{
        type:String,
        required:true
        //unique:true,
    },
    operario_id:{
        type:String,
       // required:true
        //unique:true,
    },
    lote_id:{
        type:String,
        //required:true
        //unique:true,
    },

})
module.exports = model('WorkStation', WorkStationSchema);