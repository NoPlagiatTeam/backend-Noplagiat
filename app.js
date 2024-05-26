const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const traitementRouter = require('./src/routes/TraitementRouter')
const formuleRouter = require('./src/routes/FormuleRouter')
const rapportRouter = require('./src/routes/RapportRouter')
const souscriptionRouter = require('./src/routes/SouscriptionRouter')
const tokenRouter = require('./src/routes/TokenRouter')
const userRouter = require('./src/routes/UserRouter')
const sequelize = require('./src/db/sequelize');

const app = express();
app.use(bodyParser.json())
app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
process.chdir(path.join(__dirname, '..'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

sequelize.initDB();


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
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;