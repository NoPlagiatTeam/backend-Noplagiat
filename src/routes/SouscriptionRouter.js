const express = require('express');
const {getAll, add, getByUser} = require("../controllers/SouscriptionController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get('/all',getAll)
router.post('/add',add)
router.get('/ByUser/:userId',getByUser)

module.exports = router;