const {response} = require ('express');
//const bcrypt = require('bcrypt');
const WorkStation = require('../models/WorkStation');
//const {generateJWT} = require('../helpers/jwt');

const createWorkStation = async(req, res= response)=>{
    
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
        let workStation = new WorkStation(req.body);
        await workStation.save();

        res.status(201).json({
            ok:true,
            lid: workStation.id,
            //name: user.name // aqui se pone la demas info???
        });
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        });
    }
}
const findWorkStations= async(req,res= response)=>{
    try{
        let workStation = await WorkStation.find({})
        if(!workStation){
            res.status(400).json({
                ok:false,
                msg:"WorkStation not found"
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
const findWorkStation = async(req, res=response)=>{
    const {id} = req.params;
    console.log(id)
    try{
        let workStation = await WorkStation.findById(id)
        if(!workStation){
            res.status(400).json({
                ok:false,
                msg:"WorkStation not found"
            })
        }
        res.status(201).json({
            ok:true,
            wid: workStation.id,
            tipo:workStation.tipo,
            estado: workStation.estado,
            operario_id: workStation.operario_id,
            lote_id: workStation.lote_id,
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys adminnn"
        })
    }

}


const modifyWorkStation = async(req, res= response)=>{

    const {id} =req.params
    const payload = req.body

    try{
        
        let workStation = await WorkStation.findByIdAndUpdate(id, payload,{upsert:true, new:true})
        
        if(!workStation){
            return res.status(400).json({
                ok:false,
                msg:"A WorkStation with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:workStation
        })


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }

}

const deleteWorkStation = async(req, res= response)=>{
    const {id}= req.params;
    
    try{
        let workStation = await WorkStation.findByIdAndDelete(id);
        if(!workStation){
            return res.status(400).json({
                ok:false,
                msg:"A WorkStation with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:workStation
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
    createWorkStation,
    modifyWorkStation,
    findWorkStation,
    findWorkStations,
    deleteWorkStation
}