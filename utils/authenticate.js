const ModelUser = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports = ({email, password}) => {
    return new Promise((resolve, reject)=>{
        ModelUser.find({email})
            .then((result)=>{
                const [name] = result
                console.log(result);
                if(!name) throw new Error('User doesnt exist');
                bcrypt.compare(password, name.password, function(err, same){
                    if(same){
                        resolve({same, name})
                    }else{
                        reject(new Error('Password incorrecto')) 
                    }
                })
            }).catch((error)=>{
                reject(error)
            })
    })
}



