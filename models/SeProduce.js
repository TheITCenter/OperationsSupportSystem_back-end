const { Schema, model} = require('mongoose');

const SeProduceSchema = Schema({
    workstation_id:{
        type:String,
        //required:true,
    },
    product_id:{
        type:String,
        //required:true
    }
})
module.exports = model('User', SeProduceSchema);