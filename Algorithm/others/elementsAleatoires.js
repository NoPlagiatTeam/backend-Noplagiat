function elementsAleatoires(tableau) {
    if (tableau.length < 3) {
      // Si le tableau n'a pas assez d'éléments, retournez-le tel quel
      return tableau;
    }
  
    const elementsAleatoires = [];
    const indicesUtilises = [];
  
    while (elementsAleatoires.length < 3) {
      const indexAleatoire = Math.floor(Math.random() * tableau.length);
  
      // Assurez-vous de ne pas réutiliser le même élément
      if (!indicesUtilises.includes(indexAleatoire)) {
        elementsAleatoires.push(tableau[indexAleatoire]);
        indicesUtilises.push(indexAleatoire);
      }
    }
  
    return elementsAleatoires;
  }
  
  module.exports= elementsAleatoires;