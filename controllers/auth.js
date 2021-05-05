const {response} = require ('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {generateJWT} = require('../helpers/jwt');
const {createConfirmCode} = require('../helpers/createConfirmCode')

const createUser = async(req, res= response)=>{
    
    const {email, password}= req.body;
    console.log(createUser());
    
    try{
        let user = await User.findOne({email});
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

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok:true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        });
    }
}

const findUser = async(req, res=response)=>{
    const {id} = req.params;
    console.log(id)
    try{
        let user = await User.findById(id)
        if(!user){
            res.status(400).json({
                ok:false,
                msg:"User not found"
            })
        }
        res.status(201).json({
            ok:true,
            uid: user.id,
            name:user.name,
            lastName: user.lastName,
            role: user.role
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys adminnn"
        })
    }

}


const modifyUser = async(req, res= response)=>{

    const {id} =req.params
    const payload = req.body

    try{
        
        let user = await User.findByIdAndUpdate(id, payload,{upsert:true, new:true})
        
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"A User with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:user
        })


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }

}

const deleteUser = async(req, res= response)=>{
    const {id}= req.params;
    
    try{
        let user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"A User with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:user
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }
}

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
        if(user.status != "Active"){
            return res.status(401).json({
                ok: false,
                msg:"Pending Account. Please Verify your email"
            })
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

module.exports ={
    revalidateToken,
    userLogin,
    createUser,
    modifyUser,
    findUser,
    deleteUser
}