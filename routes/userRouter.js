const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');


router.get('/users', userController.fetch)
router.get('/users/:email', userController.findOne)
router.post('/users', userController.createUser)
router.patch('/users/:email', userController.update)
router.delete('/users/:email', userController.remove)

module.exports = router;