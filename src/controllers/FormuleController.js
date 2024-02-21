const {formuleTable} = require ("../db/sequelize");
const {Op, ValidationError} = require('sequelize');



exports.findAll = async (req ,res)=>{
    formuleTable.findAll()
        .then(formule =>{
            const message ="La liste de a bien ete recuperer!"
            res.status(200).json({message,data: formule})

        })
        .catch(err =>{
            res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
        })
}

exports.add = async (req,res)=>{
    if(req.file){
        req.body.image = req.file.path
    }else{
        req.body.image = ""
    }
    formuleTable.create(req.body)
        .then(formule =>{
            const message="formule "+req.body.titre+" a bien été créé";
            res.status(200).json({message, data: formule});

        })
        .catch(err =>{
            if(err instanceof ValidationError){
                return res.status(400).json({message: err.message, data: err});
            }
            res.status(500).json({message: "Erreur lors de l'ajout d'une aeroport! Reessayer plus tard",err})
        })
}

