const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Fonction pour vérifier la similarité entre deux phrases
function checkParaphrase(phrase1, phrase2) {
    const tokens1 = tokenizer.tokenize(phrase1);
    const tokens2 = tokenizer.tokenize(phrase2);

    // Utilisation de l'algorithme TF-IDF pour mesurer la similarité
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(tokens1);
    tfidf.addDocument(tokens2);

    const similarity = tfidf.idf(tokens1[0], 0) + tfidf.idf(tokens2[0], 1);
    console.log(`Similarité : ${similarity}`);
    
    const seuil = 0.2; // Seuil de similarité

    if (similarity > seuil) {
        console.log("Ce sont des paraphrases.");
    } else {
        console.log("Ce ne sont pas des paraphrases.");
    }
    return similarity;
}

function bertsimilarity() {
  const phrase1 = "Le chat dort sur le tapis.";
const phrase2 = "Un chat repose sur le tapis.";

checkParaphrase(phrase1, phrase2);
}
module.exports=bertsimilarity
