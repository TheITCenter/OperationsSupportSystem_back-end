const { get } = require('../db');
//const Users =require('../models/Users');


function getCollection (name){
    const database = get().db('apimongo')
    const collection = database.collection(name)
    return collection
}

module.exports={
    findAll:()=>{
        return new Promise ((resolve, reject)=>{
            getCollection('users').find({}).toArray(function(err,result){
                if(err) reject(err);
                resolve(result)
            })
        })
    },
    findUserById:(email)=>{
        return new Promise ((resolve, reject)=>{
            getCollection('users').findOne({email:email.email}, function(err,result){
                //console.log(email)
                //console.log(result)
                if(err) reject(err);
                resolve(result)
            })
        })
    },
    
    create: (data)=>{
        return new Promise((resolve,reject) => {
            getCollection('users').insertOne(data,function(err,result){
                //insertMany
                if(err) reject(err);
                const [obj] = result.ops
                resolve(obj)
            })
        })
    },
    updateUserById:(email,data)=>{
        return new Promise ((resolve, reject)=>{
            getCollection('users').updateOne({email:email.email}, {$set:data} , function(err,result){
                //console.log(email)
                //console.log(result)
                if(err) reject(err);
                //const [obj] = result.ops
                resolve(result)
            })
        })
    },
    deleteUserById: (email)=>{
        return new Promise ((resolve, reject)=>{
            getCollection('users').deleteOne({email:email.email}, function(err,result){
                //console.log(email)
                //console.log(result)
                if(err) reject(err);
                resolve(result)
            })
        })
    }
}