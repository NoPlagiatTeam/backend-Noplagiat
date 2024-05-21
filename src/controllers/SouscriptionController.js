const {souscriptionTable, formuleTable, userTable} = require("../db/sequelize");
const {ValidationError} = require("sequelize");


exports.getAll = async (req ,res)=>{

    souscriptionTable.findAll({
            include:[userTable,formuleTable]
        }
    )
        .then(souscription =>{
            const message ="La liste a bien ete recuperer!"
            res.status(200).json({message,data: souscription})
        })
        .catch(err =>{
            res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
        })
}

exports.add = async (req,res)=>{
    let formule = await formuleTable.findByPk(req.body.formuleId);
    souscriptionTable.create(req.body)
        .then(rapport =>{
            userTable.findByPk(req.body.userId)
                .then(user=>{
                    if (user) {
                        // Mettez à jour le champ souhaité
                        user.credit += 	formule.nbmot;
                        // Enregistrez les modifications dans la base de données
                        return user.save();
                    } else {
                        return   res.send('Utilisateur non trouvé');
                    }
                }) .then(updatedUser => {
                if (updatedUser) {
                    console.log('Champ modifié avec succès.');
                    const message="L'souscription "+req.body.titre+" a bien été créé";
                    // Ajout de façon aléatoire d'une date d'expiration
                    rapport.expireAt = new Date().setDate(new Date().getDate()+20)
                    return   res.status(200).json({message, data: rapport});
                }
            }).catch(err => {
                console.error('Erreur lors de la modification :', err);
            })
        })
        .catch(err =>{
            if(err instanceof ValidationError){
                console.log(err);
                return res.status(400).json({message: err.message, data: err});
            }
            console.log(err);
            return  res.status(500).json({message: "Erreur lors de l'ajout d'un annonce! Reessayer plus tard",err})
        })
}

exports.getByUser = async (req ,res)=>{
    souscriptionTable.findAll({
            where:{userId:req.params.userId},
            include:[userTable,formuleTable]
        }
    )
        .then(conso =>{
            const message ="La liste a bien ete recuperer!"
            res.status(200).json({message,data: conso})
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message: "Erreur lors de la recuperation de la liste! Reessayer plus tard",err})
        })

}