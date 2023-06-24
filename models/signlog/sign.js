const bcrypt=require('bcrypt');
const crypto=require('crypto');
const bcrypt_p= require('bcrypt-promise');
const {to}=require('./../../globalfunction');
module.exports=(db, Sequelize) => {
    let Model =db.define('sign',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        username:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false
    
        },
    },
    {
        tableName:'sign',
        underscored:false,
        timestamps:true,
        schema: "signlog"
    }
);
Model.beforeSave(async function(user,options){
    let err;
    if(user.changed('password')){
        console.log('iff');
        let salt,hash;
        let rounds = crypto.randomInt(3,10);
        console.log('rpounds', rounds);
        [err,salt] = await to(bcrypt.genSalt(rounds));
        console.log('salt value', salt);
        if(err) console.log('err 11',err.message);
        [err,hash] = await to(bcrypt.hash(user.password,salt));
        console.log('hash value', hash);
        if(err) console.log('err 22',err.message);
        user.password = hash;
        console.log('user.password', user.password);
    } else {
        console.log('inside else');
    }
});
Model.prototype.comparePassword = async function (pw) {
    let err, pass;
    if (!this.password) throw new Error('PWD_NOT_SET');
    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) throw new Error(err.message);
    if (!pass) throw new Error('INVALID_PASSWORD_MSG');
    return this;
  };
    return Model;
}