const fs = require('fs');
const pdf = require('pdf-parse');
const calculateSimilarity = require('../Comparaison/calculateSimilarity');
const calculateSimilaritymidle = require('../Comparaison/calculateSimilaritymidle');
const calculateSimilaritybasic = require('../Comparaison/calculateSimilaritybasic');
const formatText = require('../others/formatText');
async function comparePDFsWithInput(inputFile, pdfFiles,res,algo) {
    try {
      // Charger le contenu du fichier d'entrée
    //  const inputBuffer = fs.readFileSync(inputFile);
     // const inputText = await pdf(inputBuffer);
  
//const inputTextContent = inputText.text;
const inputTextContent = inputFile;
      const similarityResults = [];
  
      // Comparer le texte du document d'entrée avec chaque fichier PDF téléchargé
      for (const pdfFile of pdfFiles) {
        const pdfBuffer = fs.readFileSync(pdfFile);
        const pdfText = await pdf(pdfBuffer);
  
        const pdfTextContent = pdfText.text;
  console.log(formatText(pdfText.text))
        // Implémentez votre propre algorithme de comparaison de texte ou utilisez une bibliothèque
        // Ici, un exemple simple de calcul de similarité (à améliorer)
        var similarity;
        switch (algo) {
          case 0:
            similarity = calculateSimilarity(inputTextContent, pdfTextContent);

            break;
            case 1:
               similarity = calculateSimilaritymidle(inputTextContent, pdfTextContent);

            break;
        
          default:
            similarity = calculateSimilaritybasic(inputTextContent, pdfTextContent);

            break;
        }
  
        similarityResults.push({ pdfFile, similarity });
      }
      if (res!=null) {
        res.json({ similarityResults });
      }
      return similarityResults;
    } catch (error) {
      console.error('Erreur lors de la comparaison des fichiers PDF :', error);
      throw error;
    }
  }
  module.exports =comparePDFsWithInput;
