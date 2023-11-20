const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config")
const traitementController = require("../controllers/TraitementController")

router.post('/api/detection_plagiat', multer.single('document'), traitementController.traitementDoc);
router.post('/api/analyse_doc', multer.single('document'), traitementController.analyseDoc)



module.exports = router;