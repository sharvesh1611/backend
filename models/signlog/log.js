
module.exports=(db, Sequelize) => {
    let Model =db.define('log',{
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
        password:{
            type:Sequelize.STRING,
            allowNull:false
    
        },
        signId:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    },
    {
        tableName:'log',
        underscored:false,
        timestamps:true,
        schema: "signlog"
    }
);
    return Model;
}