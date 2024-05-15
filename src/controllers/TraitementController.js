const wordCount = require('wordcount');
const mammoth = require("mammoth");
const pdf = require('pdf-parse');
const mimetype = require('mimetype');
const traitement = require("../../Algorithm/Traitement/traitement");
const elementsAleatoires = require("../../Algorithm/others/elementsAleatoires");
const getPlagiaDetail = require("../../Algorithm/Traitement/getPorcentage");
const comparePDFsWithInput = require("../../Algorithm/Traitement/comparePDFsWithInput");
const Logger = require("../../logger/Logger");
const download = require('download');
const {userTable} = require("../db/sequelize");


async function _returnNbMotAndPages(detectedMimeType, buffer, res){
    if (detectedMimeType === 'application/pdf') {
        // Pour les fichiers PDF
        const data = await pdf(buffer);
        res.json({ "nbmot": wordCount(data.text), "page":data.numpages ,"text":data.text});
        Logger("PdfType: " + detectedMimeType +" nbMots :" + wordCount(data.text) + " nbPages :" + data.numpages);
    } else if (detectedMimeType === 'application/docx') {
        // Pour les fichiers Word
        const result = await mammoth.extractRawText({ arrayBuffer: buffer });
        res.json({ "nbmot":wordCount(result.value), "page":0 ,"text":result.value});
        Logger("PdfType: " + detectedMimeType +" nbmot :" + wordCount(result.value) + " page = 0 " )
    } else {
        res.status(400).json({ error: 'Type de fichier non pris en charge.' });
        Logger("Error: Type de fichier non pris en charge ")
    }
}

exports.traitementDoc = async (req, res, next) => {
    try {
        const fileBuffer = req.file.buffer;
        // Vérifiez le type du fichier (PDF ou Word)
        if (req.file.mimetype === 'application/pdf') {
            const dataBuffer = await pdf(fileBuffer);
            const text = dataBuffer.text;
            console.log(text.split('\n\n'))
            await traitement(req, res, elementsAleatoires(text.split('\n\n')), text)
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            mammoth.extractRawText({ buffer: fileBuffer })
                .then(result => {

                    const text = result.value;
                    console.log(text.split('\n\n'))
                    traitement(req,res,elementsAleatoires(text.split('\n\n')),text)
                })
                .catch(error => {
                    console.error('Erreur lors de la conversion du document Word :', error);
                    res.status(500).send('Erreur lors de la conversion du document Word.');
                    Logger("Erreur lors de la conversion du document Word.")
                });
        } else {
            res.status(400).send('Type de fichier non pris en charge.');
            Logger("Erreur lors de la conversion du document Word.")
        }
    } catch (error) {
        console.error('Erreur lors du traitement du fichier :', error);
        res.status(500).send('Erreur lors du traitement du fichier.');
        Logger("Erreur lors du traitement du fichier.")
    }
}

exports.analyseDoc = async (req, res, next) => {
    // if the req body is a file
    if (req.file) {
        try {
            const fileBuffer = req.file.buffer;
            const detectedMimeType = req.file.mimetype
            // Vérifiez le type du fichier (PDF ou Word)
            await _returnNbMotAndPages(detectedMimeType,fileBuffer,res)
        } catch (error) {
            console.error('Erreur lors du traitement du fichier :', error);
            res.status(500).send('Erreur lors du traitement du fichier.');
            Logger("Erreur lors du traitement du fichier");
        }
    }
    // If the req.body is a link
    else{
        try {
            const {link} = req.body;
            if (!link) {
                return res.status(400).json({error: 'Veuillez fournir un lien vers le document.'});
                Logger("Veuillez fournir un lien vers le document.")
            }
            // Télécharge le document à partir du lien
            const buffer = await download(link);
            // Détecte le type de fichier
            const detectedMimeType = mimetype.lookup(link);
            console.log(detectedMimeType)
            if (!detectedMimeType) {
                return res.status(400).json({error: 'Type de fichier non pris en charge ou impossible à détecter.'});
                Logger("Type de fichier non pris en charge ou impossible à détecter.")
            }
            await _returnNbMotAndPages(detectedMimeType, buffer, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Une erreur est survenue lors du traitement du document.'});
            Logger("Une erreur est survenue lors du traitement du document.")
        }
    }

}

exports.detailPlagiat = async (req, res, next) => {
    try {
        console.log(req.body)
          await getPlagiaDetail(req.body.text, req.body.pdfFiles, res);
    } catch (error) {
        console.error('Erreur lors du traitement du fichier :', error);
        res.status(500).send('Erreur lors du traitement du fichier.');
        Logger("Erreur lors du traitement du fichier.")
    }
}

exports.newTraitementDoc = async (req, res, next)=>{
    try {
        console.log(req.body.text)
        await traitement(req, res, elementsAleatoires(req.body.text.split('\n\n')), req.body.text)
    } catch (error) {
        console.error('Erreur lors du traitement du fichier :', error);
        res.status(500).send('Erreur lors du traitement du fichier.');
        Logger("Erreur lors du traitement du fichier.")
    }
}

exports.detection = async (req, res, next) =>{
    try {
        userTable.findByPk(req.body.userId)
            .then(user=>{
                if (user) {
                    // Mettez à jour le champ souhaité
                    user.credit -=req.body.nbmot;
                    // Enregistrez les modifications dans la base de données
                    return user.save();
                } else {
                    return   res.status(400).send('Utilisateur non trouvé');
                }
            })
        return comparePDFsWithInput(req.body.text, req.body.pdfFiles,res,
            0);
    } catch (error) {
        console.error('Erreur lors du traitement du fichier :', error);
        res.status(500).send('Erreur lors du traitement du fichier.');
    }
}

