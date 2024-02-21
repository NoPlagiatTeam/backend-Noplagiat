const {rapportTable} = require("../db/sequelize");
const {ValidationError} = require("sequelize");

exports.getAll = async (req ,res)=>{

    rapportTable.findAll({
            include:[userTable]
        }
    )
        .then(user =>{
            const message ="La liste a bien ete recuperer!"
            res.status(200).json({message,data: user})
        })
        .catch(err =>{
            res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
        })
}

exports.getByUser = async (req ,res)=>{
    rapportTable.findAll({
            where:{userId:req.params.userId},
            include:[userTable]
        }
    )
        .then(user =>{
            const message ="La liste a bien ete recuperer!"
            res.status(200).json({message,data: user})
        })
        .catch(err =>{
            res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
        })
}

exports.add = async (req,res)=>{
    if(req.file){
        req.body.rapport = req.file.path
    }else{
        req.body.rapport = ""
    }
    rapportTable.create(req.body)
        .then(rapport =>{
            const message="Le rapport "+req.body.titre+" a bien été créé";
            res.status(200).json({message, data: rapport});
        })
        .catch(err =>{
            if(err instanceof ValidationError){
                console.log(err);
                return res.status(400).json({message: err.message, data: err});
            }
            console.log(err);
            res.status(500).json({message: "Erreur lors de l'ajout d'un annonce! Reessayer plus tard",err})
        })
}