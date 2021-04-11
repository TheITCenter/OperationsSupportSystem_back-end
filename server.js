
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

<<<<<<< HEAD
//CRUD
app.use('',routes);
/*
app.get('/users', userController.fetch)
app.get('/users/:email', userController.findOne)
app.post('/users', userController.createUser)
app.patch('/users/:email', userController.update)
app.delete('/users/:email', userController.remove)*/
=======
app.get('/users',async(req,res) => {
    // regresar todos los users
    try{
        const users = await findAll()
        return res.status(200).send(users)
    }catch(error){
        return res.status(400).send(error)
    }
    //consol
});

app.post('/users', async(req,res) => {
    //crear un nuevo user
    try{
        const user = await create(req.body)
        //createBulk y se cambia la ruta con /users/Bulk
        return res.status(201).send(user)
    }catch(error){
        console.log(error)
        return res.status(400).send(error)
    }


});
>>>>>>> 8bd4239... added comment

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