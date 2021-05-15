const {response} = require ('express');
//const bcrypt = require('bcrypt');
const Lote = require('../models/Lote');
//const {generateJWT} = require('../helpers/jwt');

const createLote = async(req, res= response)=>{
    
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
        let lote = new Lote(req.body);
        await lote.save();

        res.status(201).json({
            ok:true,
            lid: lote.id,
            //name: user.name // aqui se pone la demas info???
        });
    } catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        });
    }
}
const findLotes= async(req,res= response)=>{
    try{
        let lote = await Lote.find({})
        if(!lote){
            res.status(400).json({
                ok:false,
                msg:"Lote not found"
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
const findLote = async(req, res=response)=>{
    const {id} = req.params;
    console.log(id)
    try{
        let lote = await Lote.findById(id)
        if(!lote){
            res.status(400).json({
                ok:false,
                msg:"Lote not found"
            })
        }
        res.status(201).json({
            ok:true,
            lid: lote.id,
            cantidad_producida:lote.cantidad_producida,
            fecha_de_termino: lote.fecha_de_termino,
            multimedia_N: lote.multimedia_N,
            producto_id: lote.producto_id,
            n_muestra:lote.n_muestra,
            fecha_muestreo:lote.fecha_muestreo,
            resultado: lote.resultado
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys adminnn"
        })
    }

}


const modifyLote = async(req, res= response)=>{

    const {id} =req.params
    const payload = req.body

    try{
        
        let lote = await Lote.findByIdAndUpdate(id, payload,{upsert:true, new:true})
        
        if(!lote){
            return res.status(400).json({
                ok:false,
                msg:"A Lote with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:lote
        })


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:"An error has ocurred, please talk to your sys admin"
        })
    }

}

const deleteLote = async(req, res= response)=>{
    const {id}= req.params;
    
    try{
        let lote = await Lote.findByIdAndDelete(id);
        if(!lote){
            return res.status(400).json({
                ok:false,
                msg:"A Lote with that Id does not exist, please contact your sys admin"
            })
        }
        res.status(201).json({
            ok:true,
            msg:lote
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
    createLote,
    modifyLote,
    findLote,
    deleteLote
}