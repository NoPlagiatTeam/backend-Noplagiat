const comparePDFsWithInput = require("./comparePDFsWithInput");
const downloadPDFs = require("./downloadPDFs");
const searchGoogleForPDFs = require("../GoogleResearch/searchGoogleForPDFs");

async function traitement(req,res, textdoc,text) {
    var links=[];
    let index;
    try {
  for (index = 0; index < 3; index++) {
    element=textdoc[index]
    links.push( ...await  searchGoogleForPDFs(element));
    /*.then(pdfLinks => {
         links.push(pdfLinks);
         console.log(index)
    
    }).catch(error => {
      console.error('Erreur lors de la recherche :', error);
    });*/
   
  }
  console.log(links)
  console.log(index)
  
  
  const outputFolder = 'downloaded_pdfs';
  
    downloadPDFs(links, outputFolder,text)
      .then(pdfFiles => {
  
        return comparePDFsWithInput(text, pdfFiles,res,
        0);
      })
      .then(similarityResults => {
        console.log('Résultats de la comparaison :', similarityResults);
      })
      .catch(error => {
        console.error('Erreur dans lapplication :', error);
      });
  
  
  
  
      
    
      
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la détection du plagiat.' });
    }
  
    
   }
  
  module.exports=traitement;