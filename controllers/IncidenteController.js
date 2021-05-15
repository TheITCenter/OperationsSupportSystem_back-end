const {response} = require ('express');
//const bcrypt = require('bcrypt');
const Incidente  = require('../models/Incidente');
//const {generateJWT} = require('../helpers/jwt');

const createIncidente = async(req, res= response)=>{
    
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
        let incidente  = new Incidente(req.body);
        await incidente.save();

        res.status(201).json({
            ok:true,
            iid: incidente.id,
            //name: user.name // aqui se pone la demas info???
        });
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        });
    }
}
const findIncidentes = async(req,res= response)=>{
    try{
        let incidente = await Incidente.find({})
        if(!incidente){
            res.status(400).json({
                ok:false,
                msg:"incidente not found"
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
const findIncidente  = async(req, res=response)=>{
    const {id} = req.params;
    console.log(id)
    try{
        let incidente = await Incidente.findById(id)
        if(!incidente){
            res.status(400).json({
                ok:false,
                msg:"incidente not found"
            })
        }
        res.status(201).json({
            ok:true,
            lid: incidente.id,
            incidente:incidente.incidente,
            razon: incidente.razon,
            fecha_de_inicio: incidente.fecha_de_inicio,
            fecha_de_termino: incidente.fecha_de_termino,
            multimedia:incidente.multimedia,
            lote_id:incidente.lote_id,
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys adminnn"
        })
    }

}


const modifyIncidente = async(req, res= response)=>{

    const {id} =req.params
    const payload = req.body

    try{
        
        let incidente = await Incidente.findByIdAndUpdate(id, payload,{upsert:true, new:true})
        
        if(!incidente){
            return res.status(400).json({
                ok:false,
                msg:"An incident with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:incidente
        })


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }

}

const deleteIncidente = async(req, res= response)=>{
    const {id}= req.params;
    
    try{
        let incidente = await Incidente.findByIdAndDelete(id);
        if(!incidente){
            return res.status(400).json({
                ok:false,
                msg:"An incident with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:incidente
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
    createIncidente,
    modifyIncidente,
    findIncidente,
    findIncidentes,
    deleteIncidente
}