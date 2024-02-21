const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config")
const {detection, newTraitementDoc, detailPlagiat, analyseDoc, traitementDoc} = require("../controllers/TraitementController");

router.post('/detection_plagiat', multer.single('document'), traitementDoc);
router.post('/analyse_doc', multer.single('document'), analyseDoc);
router.post('/getPlagiaDetail', detailPlagiat);
router.post('/traitement_doc', newTraitementDoc);
router.post('/detection',detection);


module.exports = router;