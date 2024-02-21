const accountSid = 'AC89f197dfc31301b4c33343d88f4e7489';
const authToken = '62be8f8b36da6c93e46abcac5595cf50';
const nodemailer = require('nodemailer');
const {tokenverificationTable, userTable} = require("../db/sequelize");
const client = require('twilio')(accountSid, authToken);
const {baseUrl} = require("../db/env");

function generateSixDigitCode() {
    const min = 100000; // Le plus petit nombre à 6 chiffres (100000)
    const max = 999999; // Le plus grand nombre à 6 chiffres (999999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'etransitmobile@gmail.com',
        pass:"ttzr tqqv txpw zytx"// 'Maguoum2001',
    },
});

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');


    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
exports.mailVerification = async (req, res) => {
    const email = req.body.email;
    const token =generateSixDigitCode();
    const expirationDate = new Date(Date.now() + 24 * 3600 * 1000); // Expiration dans 24 heures
    tokenverificationTable.create({
        email,
        token,
        expiresAt: expirationDate,
    }).then(tokenV=>{
        const mailOptions = {
            from: 'kamgarodrigue54@gmail.com',
            to: email,
            subject: ' E-transit Vérification d\'e-mail',
            text: `Cliquez sur ce lien pour vérifier votre e-mail : ${baseUrl}/mailverify/email/${email}/${token}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({message:error});
            } else {
                console.log('E-mail de vérification envoyé : ' + info.response);
                return res.status(200).json({ message:'E-mail de vérification envoyé : ' + info.response});
            }
        });
    }).catch(err=>{
        console.log(err);
        const message="erreur de creation du token";
        return res.status(500).json({message, data:err});
    });

}

exports.smsVerification = async (req, res) => {
    const email = req.body.numero;
    const token = generateSixDigitCode();
    const expirationDate = new Date(Date.now() + 24 * 3600 * 1000); // Expiration dans 24 heures
    tokenverificationTable.create({
        email,
        token,
        expiresAt: expirationDate,
    }).then(tokenV=>{
        client.messages.create({
            body: ' E-transit mobile \n votre code de verification est:'+token,
            from: '+12052094536',
            to: email,
        })
            .then(message =>{
                console.log('Message SID : ' + message.sid)
                return res.status(200).json({ message:'Message SID : ' + message.sid,token:token});


            } ).catch(err=>{
            console.log(err);
            const message="erreur d envois de sms";
            return res.status(500).json({message, data:err});
        })
    }).catch(err=>{
        console.log(err);
        const message="erreur de creation du token";
        return res.status(500).json({message, data:err});
    });
}

exports.tokenVerification = async (req, res) => {
    const token = req.params.token;
    const now =new Date();
    console.log(req.params.email)
    console.log(getCurrentDateTime())
    const verificationToken = await tokenverificationTable.findOne({
        where: {
            email:req.params.email,
            token:token,
            expiresAt: {
                [Sequelize.Op.gt]: now, // Vérifiez si expiresAt est supérieur à la date actuelle
            },
        },
    });
    if (verificationToken) {
        if (req.params.type==="email") {
            userTable.findOne({where:{email:`${req.params.email}`}})
                .then(user=>{
                    if (user) {
                        // Mettez à jour le champ souhaité
                        user.emailverif = 1;
                        // Enregistrez les modifications dans la base de données
                        return user.save();
                    } else {
                        res.send('Utilisateur non trouvé');
                    }
                }) .then(updatedUser => {
                if (updatedUser) {
                    console.log('Champ modifié avec succès.');
                    res.send('E-mail vérifié avec succès');
                }
            }).catch(err => {
                console.error('Erreur lors de la modification :', err);
            })
        }
        if (req.params.type==="sms") {
            userTable.findOne({where:{tel:req.params.email}})
                .then(user=>{

                    if (user) {
                        // Mettez à jour le champ souhaité
                        user.numverif = 1;
                        // Enregistrez les modifications dans la base de données
                        return user.save();
                    } else {
                        res.send('Utilisateur non trouvé 1');
                    }
                }) .then(updatedUser => {
                if (updatedUser) {
                    console.log('Champ modifié avec succès.');

                    res.send('E-mail vérifié avec succès');
                }
            }).catch(err => {
                console.error('Erreur lors de la modification :', err);
            })
        }
    } else {
        res.send('Token invalide ou expiré');
    }
}