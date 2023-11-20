function formatText(inputText) {
    // Divisez le texte en paragraphes en utilisant un saut de ligne comme délimiteur
    const paragraphs = inputText.split('\n');
    
    // Supprimez les espaces vides au début et à la fin de chaque paragraphe
    const trimmedParagraphs = paragraphs.map(paragraph => paragraph.trim());
    
    // Supprimez les paragraphes vides
    const nonEmptyParagraphs = trimmedParagraphs.filter(paragraph => paragraph.length > 0);
    
    // Joignez les paragraphes formatés en une seule chaîne de caractères avec un espace entre les paragraphes
    const formattedText = nonEmptyParagraphs.join(' ');
    
    return formattedText;
  }
  module.exports=formatText;