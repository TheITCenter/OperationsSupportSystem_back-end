const {response} = require ('express');
//const bcrypt = require('bcrypt');
const Operario = require('../models/Operario');
//const {generateJWT} = require('../helpers/jwt');

const createOperario = async(req, res= response)=>{
    
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
        let operario = new Operario(req.body);
        await operario.save();

        res.status(201).json({
            ok:true,
            lid: operario.id,
            //name: user.name // aqui se pone la demas info???
        });
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        });
    }
}
const findOperarios= async(req,res= response)=>{
    try{
        let operario = await Operario.find({})
        if(!operario){
            res.status(400).json({
                ok:false,
                msg:"Operario not found"
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
const findOperario = async(req, res=response)=>{
    const {id} = req.params;
    console.log(id)
    try{
        let operario = await Operario.findById(id)
        if(!operario){
            res.status(400).json({
                ok:false,
                msg:"Operario not found"
            })
        }
        res.status(201).json({
            ok:true,
            oid: operario.id,
            estado:operario.estado,
            nombre: operario.nombre,
            fecha_de_inicio: operario.fecha_de_inicio,
            fecha_de_termino: operario.fecha_de_termino,
            foto: operario.foto,
            lote_id:operario.lote_id,
            workStation_id: operario.workStation_id
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys adminnn"
        })
    }

}


const modifyOperario = async(req, res= response)=>{

    const {id} =req.params
    const payload = req.body

    try{
        
        let operario = await Operario.findByIdAndUpdate(id, payload,{upsert:true, new:true})
        
        if(!operario){
            return res.status(400).json({
                ok:false,
                msg:"An Operarator with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:operario
        })


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }

}

const deleteOperario = async(req, res= response)=>{
    const {id}= req.params;
    
    try{
        let operario = await Operario.findByIdAndDelete(id);
        if(!operario){
            return res.status(400).json({
                ok:false,
                msg:"An Operator with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:operario
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
    createOperario,
    modifyOperario,
    findOperario,
    findOperario,
    deleteOperario
}