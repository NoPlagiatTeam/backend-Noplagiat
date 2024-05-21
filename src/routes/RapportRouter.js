const express = require('express');
const upload = require("../middleware/rapportUploaud");
const {getAll, add, getByUser} = require("../controllers/RapportController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get('/all',verifyToken,getAll)
router.get('/ByUser/:userId',verifyToken,upload.single("rapport"),getByUser)
router.post('/add',verifyToken,add)


module.exports = router;