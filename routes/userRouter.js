const express = require('express');
const router = express.Router();

const verify = require('../middlewares/verify');
const checkRol = require('../middlewares/checkRol')

const userController = require('../controllers/userController');
const {createUserValidator} = require('../validators/userValidator');

//[verify, checkRol('admin') ||checkRol('user') ] -- try verify and checkrol with user and admin rols
router.get('/users', userController.fetch)//to get all
router.get('/users/:email',userController.findOne)//to get one
router.post('/users',[createUserValidator] , userController.createUser)//to create, validator is valid
router.patch('/users/:email', userController.update)
router.delete('/users/:email', userController.remove)

module.exports = router;
