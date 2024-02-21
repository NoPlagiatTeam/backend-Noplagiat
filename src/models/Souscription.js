const souscription =(sequelize, DataTypes,user,formule)=>{
    const Souscription= sequelize.define('souscription', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        
        
        },
        {
            timestamps: true,
            createdAt:true,
            updateAt: 'updateTimestamp'


        }
        );
        
        Souscription.belongsTo(user)
        Souscription.belongsTo(formule)
   
        return Souscription;
}
module.exports = souscription;