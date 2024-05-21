const souscription =(sequelize, DataTypes,user,formule)=>{
    const Souscription= sequelize.define('souscription', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
            expireAt: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            timestamps: true,
            createdAt:true,
            updateAt: 'updateTimestamp'
        });
        
        Souscription.belongsTo(user)
        Souscription.belongsTo(formule)
   
        return Souscription;
}
module.exports = souscription;