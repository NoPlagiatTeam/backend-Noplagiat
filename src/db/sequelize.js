const {Sequelize, DataTypes} =require('sequelize');
const bcrypt = require('bcrypt');

// importation des models

const userModel = require('../models/User');
const formuleModel = require('../models/Formule');
const rapportModel = require('../models/Rapport');
const souscriptionModel = require('../models/Souscription');
const tokenverificationModel = require('../models/Token');
// configuration de la base de donnees 
let sequelize;
if (process.env.NODE_ENV ===  'production') {
  sequelize = new Sequelize('q3km6gfiypm99yap','fmjzknms6lf6acih','mpe1lmb1jci8jwzx',{
    host:'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect:'mariadb',
    dialectOptions:{
      timezone:'Etc/GMT-1'
    },
    logging:true
  })
}else{
   
// connection a la db en local
sequelize = new Sequelize('noPlagiat', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-1',
    },
    logging: false,
    define:{
      maxKeys: 200
    }
  })

}

// creation des models



const userTable= userModel(sequelize, DataTypes);
const formuleTable= formuleModel(sequelize, DataTypes);
const rapportTable= rapportModel(sequelize, DataTypes,userTable);
const souscriptionTable= souscriptionModel(sequelize, DataTypes,userTable,formuleTable);
const tokenverificationTable= tokenverificationModel(sequelize, DataTypes);

//const paysTable= paysModel(sequelize, DataTypes);
//const aeroportTable= aeroportModel(sequelize, DataTypes,paysTable);

//association de la baase de donnees

 function initDB(){
  console.log("initialisation des tables de la base de donnees");
  return sequelize.sync({alter:true})
 }


module.exports = {   initDB,userTable,tokenverificationTable,formuleTable,souscriptionTable,rapportTable};




