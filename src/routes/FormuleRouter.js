const express = require('express');
const upload = require("../middleware/formuleUpload");
const router = express.Router();
const {add,findAll} = require("../controllers/FormuleController");

router.post('/add',upload.single("image"),add)
router.get('/all',findAll)

module.exports = router;