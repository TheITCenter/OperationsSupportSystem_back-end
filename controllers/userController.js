const {findAll, create, findUserById, updateUserById, deleteUserById} = require('../services/userServices')

const fetch = async(req,res) => {
    // regresar todos los users
    try{
        const users = await findAll()
        return res.status(200).send(users)
    }catch(error){
        return res.status(400).send(error)
    }
};

const findOne = async(req,res) => {
    //crear un nuevo user
    try{
        //console.log(req.params)
        const user = await findUserById(req.params)
        //createBulk y se cambia la ruta con /users/Bulk
        return res.status(200).send(user)
    }catch(error){
        console.log(error)
        return res.status(400).send(error)
    }
};
const createUser =  async(req,res) => {
    //crear un nuevo user
    try{
        const user = await create(req.body)
        //createBulk y se cambia la ruta con /users/Bulk
        return res.status(201).send(user)
    }catch(error){
        console.log(error)
        return res.status(400).send(error)
    }
};

const update = async(req,res) => {
    //crear un nuevo user
    try{
        //console.log(req.params)
        const user = await updateUserById(req.params, req.body)
        //createBulk y se cambia la ruta con /users/Bulk
        return res.status(200).send(user)
    }catch(error){
        console.log(error)
        return res.status(400).send(error)
    }
};

const remove = async(req,res) => {
    //crear un nuevo user
    try{
        //console.log(req.params)
        const user = await deleteUserById(req.params)
        //createBulk y se cambia la ruta con /users/Bulk
        return res.status(204).send(user)
    }catch(error){
        console.log(error)
        return res.status(400).send(error)
    }
};

module.exports = {
    createUser, 
    fetch, 
    findOne,
    update,
    remove
}