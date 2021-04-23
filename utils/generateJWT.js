const JWT = require('jsonwebtoken');
//const SECRET_KEY  = process.env.SECRET_KEY
const SECRET_KEY  = process.env.SECRET_KEY
//cifrar los archivos hhtps:  >> openssl rand -base64 40

module.exports =({name, rol, email })=>{
    const payload ={
        name, 
        rol,
        email
    }
    return JWT.sign(payload, SECRET_KEY, {expiresIn:'24h'})
}