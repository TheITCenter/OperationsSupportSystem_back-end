const JWT = require('jsonwebtoken');
const UserModel = require('../models/Users');
const SECRET_KEY  = process.env.SECRET_KEY

module.exports = async (req,res, next)=>{
    try{
    const Auhtorization = req.get('Authorization')
//console.log(Auhtorization);
    if(Auhtorization){
        const token = Auhtorization.replace('JWT ',""); // JWT 2rthrewfsdfbfba-->> dbsabnsba
        const payload = JWT.verify(token, SECRET_KEY) 
        //validar token y que pertenece a este backend
        //console.log(payload)
        if(payload){
            const {email}=payload
            const [name] = await UserModel.find({email}).catch(()=>req.status(400).send({'message':'No podemos hacer esto'}))
            if(!name) return res.status(404).send({'message':'User no encontrado'});
            //console.log(user)
            req.name=name;//inicia la sesion
            next();//pasa al siguiente middleware o controller
        }else{
            return res.status(401).send({'message':'Invalid token'})
        }
    }else{
        return res.status(400).send({'message':'Header no enviado'})
    }
}catch(error){
    return res.status(400).send(error)
}
}