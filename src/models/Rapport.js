const Rapport =(sequelize, DataTypes,user)=>{
    const Rapport= sequelize.define('rapport', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            rapport: {
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


    Rapport.belongsTo(user)

    return Rapport;
}
module.exports = Rapport;