const express = require('express');
const {dbConnection} =require('./database/config')
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors')
const Sockets = require('./sockets/sockets');
require('dotenv').config();
const app =express();
const server = http.createServer(app);
const io = socketio(server,{})
new Sockets(io);

//DataBase
dbConnection();

//CORS
app.use(cors())

//Directorio Publico
app.use( express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'))


app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
} )
