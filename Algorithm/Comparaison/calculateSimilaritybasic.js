
const now = require('performance-now');

function calculateSimilaritybasic(text1, text2) {
    const start = now(); 
  // Exemple simplifié de calcul de similarité (à améliorer)
  const commonWords = text1.split('').filter(word => text2.includes(word));
  const similarity = (commonWords.length / text1.split(' ').length) * 100;

  
  
  const end = now(); // Enregistrez le moment où la fonction a terminé l'exécution
  const executionTime = (end - start).toFixed(2); // Calculez le temps d'exécution en millisecondes

  console.log('Temps d\'exécution de la fonction :', executionTime, 'ms');
  return similarity;
}
module.exports=calculateSimilaritybasic;