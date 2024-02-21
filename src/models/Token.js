const tokenverification =(sequelize, DataTypes)=>{
    const Tokenverification= sequelize.define('tokenverification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          token: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          expiresAt: {
            type: DataTypes.DATE,
          },
        
        
        },
        {
            timestamps: true,
            createdAt:true,
            updateAt: 'updateTimestamp'


        }
        );
        
    
   
        return Tokenverification;
}
module.exports = tokenverification;