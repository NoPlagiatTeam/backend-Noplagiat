const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config")
const {detection, newTraitementDoc, detailPlagiat, analyseDoc, traitementDoc} = require("../controllers/TraitementController");
const verifyToken = require("../middleware/auth");

router.post('/detection_plagiat', verifyToken, multer.single('document'), traitementDoc);
router.post('/analyse_doc', verifyToken, multer.single('document'), analyseDoc);
router.post('/getPlagiaDetail', verifyToken, detailPlagiat);
router.post('/traitement_doc', verifyToken, newTraitementDoc);
router.post('/detection', verifyToken, detection);


module.exports = router;