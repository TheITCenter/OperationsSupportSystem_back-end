const {response} = require ('express');
//const bcrypt = require('bcrypt');
const Producto = require('../models/Producto');
//const {generateJWT} = require('../helpers/jwt');

const createProducto = async(req, res= response)=>{
    
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
        let producto = new Producto(req.body);
        await producto.save();

        res.status(201).json({
            ok:true,
            lid: producto.id,
            //name: user.name // aqui se pone la demas info???
        });
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        });
    }
}
const findProductos= async(req,res= response)=>{
    try{
        let producto = await Producto.find({})
        if(!producto){
            res.status(400).json({
                ok:false,
                msg:"Producto not found"
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
const findProducto = async(req, res=response)=>{
    const {id} = req.params;
    console.log(id)
    try{
        let producto = await Producto.findById(id)
        if(!producto){
            res.status(400).json({
                ok:false,
                msg:"Producto not found"
            })
        }
        res.status(201).json({
            ok:true,
            pid: producto.id,
            color:producto.color,
            impresion: producto.impresion,
            t_fabricacion: producto.t_fabricacion,
            dimensiones: producto.dimensiones,
            lote_id: producto.lote_id,
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys adminnn"
        })
    }

}


const modifyProducto = async(req, res= response)=>{

    const {id} =req.params
    const payload = req.body

    try{
        
        let producto = await Producto.findByIdAndUpdate(id, payload,{upsert:true, new:true})
        
        if(!producto){
            return res.status(400).json({
                ok:false,
                msg:"A producto with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:producto
        })


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }

}

const deleteProducto = async(req, res= response)=>{
    const {id}= req.params;
    
    try{
        let producto = await Producto.findByIdAndDelete(id);
        if(!producto){
            return res.status(400).json({
                ok:false,
                msg:"A producto with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:producto
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
    createProducto,
    modifyProducto,
    findProducto,
    findProductos,
    deleteProducto
}