const natural = require('natural');
const now = require('performance-now');
//calcule la similarité en utilisant l'indice de Jaccard, qui mesure la similitude entre deux ensembles
function calculateSimilarity(text1, text2) {
    const start = now(); 

  // Tokenizez les deux textes en mots
  const tokenizer = new natural.WordTokenizer();
  const tokens1 = new Set(tokenizer.tokenize(text1));
  const tokens2 = new Set(tokenizer.tokenize(text2));

  // Calculez la distance de Jaccard entre les deux ensembles de tokens
  const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
  const union = new Set([...tokens1, ...tokens2]);
  const jaccardSimilarity = intersection.size / union.size;

  // Convertissez la similarité en pourcentage
  const similarity = jaccardSimilarity * 100;
  
  const end = now(); // Enregistrez le moment où la fonction a terminé l'exécution
  const executionTime = (end - start).toFixed(2); // Calculez le temps d'exécution en millisecondes

  console.log('Temps d\'exécution de la fonction :', executionTime, 'ms');

  return similarity;
}

module.exports=calculateSimilarity