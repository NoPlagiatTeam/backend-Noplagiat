const downloadPDFs = require("../others/downloadPDFs");
const searchGoogleForPDFs = require("../GoogleResearch/searchGoogleForPDFs");
const Logger = require("../../logger/Logger");

async function traitement(req,res, textdoc,text) {
    let links = [];
    let index;
    let element;
    try {
        for (index = 0; index < 3; index++) {
            element=textdoc[index]
            links.push( ...await  searchGoogleForPDFs(element));
        }
        links=[... new Set(links)];
        console.log(links)
        console.log(index)
        const outputFolder = 'downloaded_pdfs';
        downloadPDFs(links, outputFolder,text)
            .then(pdfFiles => {
                res.status(200).json({pdfFiles});
                Logger("pdfFiles : " + pdfFiles)
            })
            .then(similarityResults => {
                console.log('Résultats de la comparaison :', similarityResults);
                Logger("Résultats de la comparaison : " + similarityResults)
            })
            .catch(error => {
                console.error('Erreur dans lapplication :', error);
                Logger("Erreur survenu dans l'application : " + error)
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la détection du plagiat.' });
        Logger('Une erreur est survenue lors de la détection du plagiat.')
    }

}
  
module.exports=traitement;