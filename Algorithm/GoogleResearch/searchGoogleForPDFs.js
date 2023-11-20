
const puppeteer = require('puppeteer');
const formatText = require('../others/formatText');


async function searchGoogleForPDFs(query) {
    console.log(`https://www.google.com/search?q=${encodeURIComponent(formatText(query))}&num=10&filter=0`)
      try {
        const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
        // Effectuer une recherche Google avec la requête
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&num=10&filter=0`);
        
        // Extraire les liens pertinents pointant vers des fichiers PDF
        var ct =await page.content();
        console.log(ct.toString())
        const pdfLinks = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a'));
          
          return links
            .map(link => link.href)
            .filter(href => href.endsWith('.pdf'));
        });
    
        await browser.close();
  console.log(pdfLinks)
        return pdfLinks;
      } catch (error) {
        console.error('Erreur lors de la recherche de fichiers PDF :', error);
        throw error;
      }
    }
   module.exports=searchGoogleForPDFs;