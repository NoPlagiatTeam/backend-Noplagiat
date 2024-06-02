const express = require('express');
const {getAll, add, getByUser} = require("../controllers/SouscriptionController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get('/all',verifyToken,getAll)
router.post('/add',add)
router.get('/ByUser/:userId',verifyToken, getByUser)

module.exports = router;