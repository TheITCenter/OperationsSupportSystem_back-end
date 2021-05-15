const {response} = require ('express');
//const bcrypt = require('bcrypt');
const SeProduce = require('../models/SeProduce');
//const {generateJWT} = require('../helpers/jwt');

const createSeProduce = async(req, res= response)=>{
    
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
        let seProduce = new SeProduce(req.body);
        await seProduce.save();

        res.status(201).json({
            ok:true,
            lid: seProduce.id,
            //name: user.name // aqui se pone la demas info???
        });
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        });
    }
}
const findSeProducen= async(req,res= response)=>{
    try{
        let seProduce = await SeProduce.find({})
        if(!seProduce){
            res.status(400).json({
                ok:false,
                msg:" not found"
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
const findSeProduce = async(req, res=response)=>{
    const {id} = req.params;
    console.log(id)
    try{
        let seProduce = await SeProduce.findById(id)
        if(!seProduce){
            res.status(400).json({
                ok:false,
                msg:" not found"
            })
        }
        res.status(201).json({
            ok:true,
            wid: seProduce.id,
            tipo:seProduce.workstation_id,
            estado: seProduce.product_id,
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys adminnn"
        })
    }

}


const modifySeProduce = async(req, res= response)=>{

    const {id} =req.params
    const payload = req.body

    try{
        
        let seProduce = await SeProduce.findByIdAndUpdate(id, payload,{upsert:true, new:true})
        
        if(!seProduce){
            return res.status(400).json({
                ok:false,
                msg:"A produced good with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:seProduce
        })


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }

}

const deleteSeProduce = async(req, res= response)=>{
    const {id}= req.params;
    
    try{
        let seProduce = await SeProduce.findByIdAndDelete(id);
        if(!seProduce){
            return res.status(400).json({
                ok:false,
                msg:"A produced good with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:seProduce
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
    createSeProduce,
    modifySeProduce,
    findSeProduce,
    findSeProducen,
    deleteSeProduce
}