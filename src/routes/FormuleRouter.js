const express = require('express');
const upload = require("../middleware/formuleUpload");
const router = express.Router();
const {add,findAll} = require("../controllers/FormuleController");
const verifyToken = require("../middleware/auth");

router.post('/add',verifyToken,upload.single("image"),add)
router.get('/all', verifyToken, findAll)

module.exports = router;