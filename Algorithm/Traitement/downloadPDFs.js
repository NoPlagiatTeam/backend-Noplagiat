const download = require('download');

async function downloadPDFs(pdfLinks, outputFolder) {
    console.log(" Téléchargez les documents à partir des liens et stockez-les localement");
    
        const downloadedPDFs = [];
        for (const link of pdfLinks) {
          console.log(link)
            try {
               
              // Téléchargez les documents à partir des liens et stockez-les localement
              const fileName = link.split('/').pop();
              const filePath = `${outputFolder}/${fileName}`;
              await download(link, outputFolder, { filename: fileName });
              
              downloadedPDFs.push(filePath);
              //console.log(pdfLinks)
             
    
            } catch (error) {
              console.error(`Erreur lors du téléchargement de ${link}: ${error.message}`);
            }
          }
          return downloadedPDFs;
        }
        module.exports= downloadPDFs;