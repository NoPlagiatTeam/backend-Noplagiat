let fs = require('fs');

module.exports = (line, no_cl)=> {
    let ln = new Date().toString() + " ---> " + line + "\n";
    fs.appendFileSync('./logs.txt', ln);
    if (no_cl==null || no_cl===false) console.log(ln);
}