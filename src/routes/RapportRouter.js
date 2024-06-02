const express = require('express');
const upload = require("../middleware/rapportUpload");
const {getAll, add, getByUser} = require("../controllers/RapportController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get('/all', verifyToken,getAll)
router.get('/byUser/:userId',verifyToken, getByUser)
router.post('/add',verifyToken,upload.single("rapport"),add)


module.exports = router;