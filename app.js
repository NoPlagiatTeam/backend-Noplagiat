const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const traitementRouter = require('./src/routes/TraitementRouter')
const formuleRouter = require('./src/routes/FormuleRouter')
const rapportRouter = require('./src/routes/RapportRouter')
const souscriptionRouter = require('./src/routes/SouscriptionRouter')
const tokenRouter = require('./src/routes/TokenRouter')
const userRouter = require('./src/routes/UserRouter')
// const sequelize = require('./src/db/sequelize');
const port = normalizePort(process.env.PORT || '5000');

const app = express();

// sequelize.initDB().then(r => console.log("Connexion à la BD effectuée"));

app.use(bodyParser.json())
app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/downloaded_pdfs',express.static(__dirname + '/downloaded_pdfs'))
app.use('/upload_docs',express.static(__dirname + '/upload_docs'))

// Liste des routes du serveur
app.use('/api/', traitementRouter);
app.use('/api/formule', formuleRouter)
app.use('/api/rapport', rapportRouter)
app.use('/api/user', userRouter)
app.use('/api/souscription', souscriptionRouter)
app.use('/api/token', tokenRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(port, () => {
  console.log(`L'API est en cours d'exécution sur http://localhost:${port}`);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = app;