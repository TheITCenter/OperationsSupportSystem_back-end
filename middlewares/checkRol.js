module.exports = (rol)=>{//generic function
    return (req,res,next)=>{
        //console.log(req.user)
        if( rol === req.name.rol){
            next();
        }else{
            return res.status(403).send({'message':'No tienes permiso para eso'})
        }
    }
}
