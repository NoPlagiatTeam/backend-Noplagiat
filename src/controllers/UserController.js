const {userTable} = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const private_key = require('../auth/private_key');
exports.login = async (req,res)=>{
    console.log(req.body);

    userTable.findOne({where:{email:req.body.email}, include:[userTable]})
        .then(user=>{
            if(!user){
                const message="l'utilisateur demandé est inexistant";
                return res.status(404).json({message});
            }
            bcrypt.compare(req.body.password,user.password)
                .then(isPasswordValid=>{
                    if(!isPasswordValid){
                        const message="Le mot de passe est incorrect!";
                        return res.status(401).json({message});
                    }
                    // JWT
                      const token =jwt.sign(
                          {
                              clientsId:user.id
                          },
                          private_key,
                          {expiresIn:'1000h'}
                      )
                    // req.session.user=user;
                    const message="L'utilisateur a ete connecte avec succes!";
                    return res.status(200).json({message, data:user,token});
                })
        })
        .catch(err=>{
            console.log(err);
            const message="La connexion a echoue! réessayez dans quelques instants";
            return res.status(500).json({message, data:err});
        })
}

exports.register = async (req,res)=>{
    req.body.password= bcrypt.hashSync(req.body.password,10);
    if(req.file){
        console.log(req.files);
        req.body.photo = req.file.path
    }else{
        req.body.photo = ""
    }
    userTable.create(req.body)
        .then(user =>{
            const message="  user "+req.body.email+" a bien été créé";
            res.status(200).json({message, data: user});
        })
        .catch(err =>{
            if(err){
                console.log(err)
                return res.status(400).json({message: err.message, data: err});
            }
            res.status(500).json({message: "Erreur lors de l'ajout d'un user! Reessayer plus tard",err})
        })
}

exports.getByUserId = async (req,res)=>{
    console.log(req.params);
    userTable.findByPk(req.params.id)
        .then(user=>{
            if(!user){
                const message="l'utilisateur demandé est inexistant";
                return res.status(404).json({message});
            }
            const message="L'utilisateur a ete connecte avec succes!";
            return res.status(200).json({message, data:user});
        })
        .catch(err=>{
            console.log(err);
            const message="utiliaateur  non existant";
            return res.status(500).json({message, data:err});
        })
}

exports.update = async (req,res)=>{
    const newPassword = req.body.password ? bcrypt.hashSync(req.body.password,10) : undefined
    const updateData = {email: req.body.email, password: newPassword }
    const userId = req.body.userId
    try{
        console.log(updateData)
        const [updated] = await userTable.update(updateData, {
            where: { id: userId }
        });
        if (updated) {
            const updatedUser = await userTable.findByPk(userId);
            const message = 'User updated successfully';
            return res.status(200).json({message, data: updatedUser});
        } else {
            const message = 'User not found or no changes made'
            return res.status(404).json({message});
        }
    }catch (e){
        console.error('Error updating user:', e);
        console.log(e);
        const message="utiliaateur  non existant";
        return res.status(500).json({message, data:e});
    }

}
