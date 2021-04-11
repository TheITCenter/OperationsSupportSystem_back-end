
const express =  require('express');

//const {MongoClient} = require('mongodb');
const { connect} = require('./db');
//const {findAll, create, findUserById, updateUserById, deleteUserById} = require('./services/userServices')
const app = express();
const {MONGODB_ADMIN} =require('./config')

const routes = require('./routes');
//const userController = require('./controllers/userController');
//const {MONGODB_USER} =require('./config')
//const MONGODB="mongodb+srv://admin:q1qap044T50wH7IS@cluster0.7fvlb.mongodb.net/Cluster0?retryWrites=true&w=majority"

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//CRUD
app.use('',routes);
/*
app.get('/users', userController.fetch)
app.get('/users/:email', userController.findOne)
app.post('/users', userController.createUser)
app.patch('/users/:email', userController.update)
app.delete('/users/:email', userController.remove)*/

connect(MONGODB_ADMIN,function(error){
    if(error){
        console.log("Unable to conect to mongo");
        process.exit(1) // termina con el server
    }else{
        console.log('conneted to database')
        app.listen(3000,() =>{
            console.log("Server ready!! 🚀");
        })
    }
})