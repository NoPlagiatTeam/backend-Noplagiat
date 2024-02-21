const natural = require('natural');
const fs = require('fs');
const pdf = require('pdf-parse');
const formatText = require('../others/formatText');

//methode qui faitb la reunion du nobre de mots unique et plagier
function getUnionsWithoutDuplicates(data,doc1) {
    const tokenizer = new natural.SentenceTokenizer();
    const sentences1 = tokenizer.tokenize(doc1);


    var plagiarized=0;
    var unique = 0;
    var plagiarizedPhrases = [];
    var uniquePhrases = [];
    totalphrase=sentences1.length

    data.forEach(element => {

        // trouvons le nombre maximal des mot plagier.
        const nbplagiarizedPhrases = element.analye.plagiarizedPhrasesrep.nb;
        const nbuniquePhrases = element.analye.uniquePhrasesrep.nb;
        plagiarized=plagiarized<nbplagiarizedPhrases?nbplagiarizedPhrases:plagiarized;
        unique=unique>nbuniquePhrases?nbuniquePhrases:unique;
//==============================================================

        // trouvons DE MANIERE MAXIMAL les mot plagier et unique des mot plagier.
        plagiarizedPhrases =plagiarizedPhrases.length<nbplagiarizedPhrases? element.analye.plagiarizedPhrasesrep.plagiarizedPhrases:plagiarizedPhrases;
        uniquePhrases =uniquePhrases.length>nbuniquePhrases? element.analye.uniquePhrasesrep.uniquePhrases:uniquePhrases;


    });


    // Retourner les résultats
    return {
        "text":sentences1,
        plagiarized,
        unique,
        totalphrase,
        plagiarizedPhrases,
        uniquePhrases
    };
}


function findPlagiarizedPhrases(doc1, doc2) {
    // Tokenization des documents en phrases
    const tokenizer = new natural.SentenceTokenizer();
    const sentences1 = tokenizer.tokenize(doc1);
    const sentences2 = tokenizer.tokenize(doc2);

    // Stockage des phrases plagiées et des phrases uniques
    const plagiarizedPhrases = [];
    const uniquePhrases = [];

    // Comparaison des phrases entre les deux documents
    sentences1.forEach(sentence1 => {
        if (sentences2.includes(sentence1)) {
            plagiarizedPhrases.push(sentence1);
        } else {
            uniquePhrases.push(sentence1);
        }
    });
    plagiarizedPhrasesrep={
        "plagiarizedPhrases":plagiarizedPhrases,
        "nb":plagiarizedPhrases.length
    }
    uniquePhrasesrep={
        "uniquePhrases":uniquePhrases,
        "nb":uniquePhrases.length
    }

    return { plagiarizedPhrasesrep, uniquePhrasesrep };
}



async function getPlagiaDetail(inputFile, pdfFiles,res) {
    try {

        const inputTextContent = inputFile;
        var similarityResults = [];

        // Comparer le texte du document d'entrée avec chaque fichier PDF téléchargé
        for (const pdfFile of pdfFiles) {
            const pdfBuffer = fs.readFileSync(pdfFile);
            const pdfText = await pdf(pdfBuffer);

            const pdfTextContent = pdfText.text;
            console.log("contenu"+formatText(pdfText.text))
            var analye;

            analye = findPlagiarizedPhrases(formatText(inputTextContent), formatText(pdfTextContent));



            similarityResults.push({ pdfFile, analye });
        }
        if (res!=null) {
            similarityResults=getUnionsWithoutDuplicates(similarityResults,formatText(inputTextContent));
            res.json({ similarityResults});
        }
        return similarityResults;
    } catch (error) {
        console.error('Erreur lors de la comparaison des fichiers PDF :', error);
        throw error;
    }
}


  module.exports = getPlagiaDetail;
