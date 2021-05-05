
const createConfirmCode =()=>{
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let confirmCode ='';
        for (let i=0;i<25; i++){
            confirmCode +=characters[Math.floor(Math.random()*characters.length)];
        }
        return confirmCode
}

module.exports ={
    createConfirmCode
}