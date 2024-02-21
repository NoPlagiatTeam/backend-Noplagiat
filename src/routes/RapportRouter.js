const express = require('express');
const upload = require("../middleware/rapportUploaud");
const {getAll, add, getByUser} = require("../controllers/RapportController");
const router = express.Router();

router.get('/all',getAll)
router.get('/ByUser/:userId',upload.single("rapport"),getByUser)
router.get('/add',add)


module.exports = router;