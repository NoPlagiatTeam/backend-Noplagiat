
const now = require('performance-now');
const stringSimilarity = require('string-similarity');
function calculateSimilaritymidle(text1, text2) {
    // Utilisez string-similarity pour calculer la similarité entre les deux textes
    var similarity = stringSimilarity.compareTwoStrings(text1, text2) * 100;
  
    
    const end = now(); // Enregistrez le moment où la fonction a terminé l'exécution
    const executionTime = (end - start).toFixed(2); // Calculez le temps d'exécution en millisecondes
  
    console.log('Temps d\'exécution de la fonction :', executionTime, 'ms');
    return similarity;
  }
  module.exports=calculateSimilaritymidle;