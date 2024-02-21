const formule =(sequelize, DataTypes)=>{
    const Formule= sequelize.define('formule', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nbmot: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nbpage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expireAt: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isAvailable:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        nbpost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
           
        },
        
        },
        {
            timestamps: true,
            createdAt:true,
            updateAt: 'updateTimestamp'


        }
        );
       
    
   
        return Formule;
}
module.exports = formule;