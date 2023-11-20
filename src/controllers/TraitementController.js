const wordCount = require('wordcount');
const mammoth = require("mammoth");
const pdf = require('pdf-parse');
const traitement = require("../../Algorithm/Traitement/traitement");
const elementsAleatoires = require("../../Algorithm/others/elementsAleatoires");


exports.traitementDoc = async (req, res, next) => {
    try {
        const fileBuffer = req.file.buffer;

        // Vérifiez le type du fichier (PDF ou Word)
        if (req.file.mimetype === 'application/pdf') {
            const dataBuffer = await pdf(fileBuffer);
            var text = dataBuffer.text
            console.log(text.split('\n\n'))
            traitement(req,res, elementsAleatoires(text.split('\n\n')),text)
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
                });
        } else {
            res.status(400).send('Type de fichier non pris en charge.');
        }
    } catch (error) {
        console.error('Erreur lors du traitement du fichier :', error);
        res.status(500).send('Erreur lors du traitement du fichier.');
    }
}

exports.analyseDoc = async (req, res, next) => {
    try {
        const fileBuffer = req.file.buffer;
        // Vérifiez le type du fichier (PDF ou Word)
        if (req.file.mimetype === 'application/pdf') {
            const dataBuffer = await pdf(fileBuffer);

            res.json({ "nbmot": wordCount(dataBuffer.text), "page":dataBuffer.numpages ,"text":dataBuffer.text});

        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            mammoth.extractRawText({ buffer: fileBuffer })
                .then(result => {
                    console.log(result);
                    res.json({ "nbMot": wordCount(result.value), "page":0 ,"text":result.value});
                })
                .catch(error => {
                    console.error('Erreur lors de l analyse du document Word :', error);
                    res.status(500).send('Erreur lors de la conversion du document Word.');
                });
        } else {
            res.status(400).send('Type de fichier non pris en charge.');
        }
    } catch (error) {
        console.error('Erreur lors du traitement du fichier :', error);
        res.status(500).send('Erreur lors du traitement du fichier.');
    }
}