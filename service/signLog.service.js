const Sign =require('../models').sign;
const Log=require('../models').log;
const {to,TE}=require('../globalfunction');
const bcrypt=require('bcrypt');

const createSignUp=async function(body){
    let[err,SignUp]=await to(Sign.findOne({
        where:{
        username:body.username,
        email:body.email
        }
    }));
    if(err) return TE(err.message);
    if(!SignUp){
        let[err1,data]=await to(Sign.create({
                username:body.username,
                email:body.email,
                password:body.password
            }))
        if(err1) return TE(err1.message);
        if(data) return {data}; 
        
    }
    return TE("already exist");
}
const logIn = async function(body){
    let[err1,loginn]=await to(Sign.findOne({
        where:{
            username:body.username
        }
    }))
    if(err1) return TE(err1.message);
    console.log(loginn);
   if (loginn && await loginn.comparePassword(body.password)) {
    return loginn;
  }
      return TE('login failed');  
}
const setNewPassword = async function (body) {
    let [err, login] = await to(Log.findOne({
      where: {
        username: body.username,
      },
    }));
  
    if (err) return TE(err.message);
  
    if (login && body.newpassword == body.confirmpassword) {
      let [err1, sign] = await to(Sign.findOne({
        where: {
          username: login.username,
        },
      }));
  
      if (err1) return TE(err1.message);
  
      if (sign) {
     
        let [err2, updatedSign] = await to(Sign.update(
          {
            password: hashedPassword,
          },
          {
            where: {
              username: sign.username,
            },
          }
        ));
  
        if (err2) return TE(err2.message);
  
        if (updatedSign) return updatedSign;
      }
    }
  };


module.exports={createSignUp,logIn,setNewPassword};