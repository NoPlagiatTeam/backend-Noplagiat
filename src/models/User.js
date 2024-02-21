const user =(sequelize, DataTypes)=>{
    const User= sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg:"l'email est déjà utilisé"
            },
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING,
            unique: {
                msg:"le tel est déjà utilisé"
            },
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
           
        },
        credit:{
            type: DataTypes.DOUBLE,
          
        },
       
        emailverif: {
            type: DataTypes.BOOLEAN,
           
        },
        numverif: {
            type: DataTypes.BOOLEAN,
           
        },


       
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                min:6
            }
        }
        },
        {
            timestamps: true,
            createdAt:true,
            updateAt: 'updateTimestamp'


        }
        );
      
        User.belongsTo(User);
        

        return User;
}
module.exports = user;