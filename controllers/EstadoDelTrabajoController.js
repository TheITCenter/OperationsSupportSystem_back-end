const {response} = require ('express');
//const bcrypt = require('bcrypt');
const EstadoDelTrabajo = require('../models/EstadoDelTrabajo');
//const {generateJWT} = require('../helpers/jwt');

const createEstadoDelTrabajo = async(req, res= response)=>{
    
    //const {email, password}= req.body;
    
    try{
        /*let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'email is already registered'
            });
        }
        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);

        await user.save();

        const token = await generateJWT(user.id, user.name)*/
        
        //let user = await User.findOne({email});
        let estadoDelTrabajo = new EstadoDelTrabajo(req.body);
        await estadoDelTrabajo.save();

        res.status(201).json({
            ok:true,
            lid: estadoDelTrabajo.id,
            //name: user.name // aqui se pone la demas info???
        });
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        });
    }
}
const findEstadoDelTrabajos= async(req,res= response)=>{
    try{
        let estadoDelTrabajo = await EstadoDelTrabajo.find({})
        if(!estadoDelTrabajo){
            res.status(400).json({
                ok:false,
                msg:"EstadoDelTrabajo not found"
            })
        }
        res.status(200).toArray(function(err,result){
            if(err) reject(err);
            resolve(result)
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys adminnn"
        })
    }
}
const findEstadoDelTrabajo = async(req, res=response)=>{
    const {id} = req.params;
    console.log(id)
    try{
        let estadoDelTrabajo = await EstadoDelTrabajo.findById(id)
        if(!estadoDelTrabajo){
            res.status(400).json({
                ok:false,
                msg:"EstadoDelTrabajo not found"
            })
        }
        res.status(201).json({
            ok:true,
            eid: estadoDelTrabajo.id,
            fecha_de_inicio:estadoDelTrabajo.fecha_de_inicio,
            fecha_de_termino: estadoDelTrabajo.fecha_de_termino,
            foto: estadoDelTrabajo.foto,
            workstation_id: estadoDelTrabajo.workstation_id,
            operario_id: estadoDelTrabajo.operario_id,
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys adminnn"
        })
    }

}


const modifyEstadoDelTrabajo = async(req, res= response)=>{

    const {id} =req.params
    const payload = req.body

    try{
        
        let estadoDelTrabajo = await EstadoDelTrabajo.findByIdAndUpdate(id, payload,{upsert:true, new:true})
        
        if(!estadoDelTrabajo){
            return res.status(400).json({
                ok:false,
                msg:"An estadoDelTrabajo with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:estadoDelTrabajo
        })


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }

}

const deleteEstadoDelTrabajo = async(req, res= response)=>{
    const {id}= req.params;
    
    try{
        let estadoDelTrabajo = await EstadoDelTrabajo.findByIdAndDelete(id);
        if(!estadoDelTrabajo){
            return res.status(400).json({
                ok:false,
                msg:"A estadoDelTrabajo with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:estadoDelTrabajo
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }
}

/*
const userLogin = async(req, res= response)=>{

    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"A user with that email does not exist"
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            res.status(400).json({
                ok:false,
                msg:"Password is Incorrect"
            });
        }
        const token = await generateJWT(user.id, user.name);
        res.json({
            ok:true,
            uid:user.id,
            name: user.name,
            token
        });       
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        });
    };
};
*/
/*
const revalidateToken = async(req, res =response)=>{
    const uid = req.uid;
    const name = req.name;
    const token = await generateJWT(uid, name);
    res.json({
        ok:true,
        msg:"Token Revalidate",
        uid,
        name,
        token,
    });
};
*/
module.exports ={
    //revalidateToken,
   // userLogin,
    createEstadoDelTrabajo,
    modifyEstadoDelTrabajo,
    findEstadoDelTrabajo,
    findEstadoDelTrabajos,
    deleteEstadoDelTrabajo
}