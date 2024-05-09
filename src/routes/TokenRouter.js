const express = require('express');
const {mailVerification, smsVerification} = require("../controllers/TokenController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get('/mailverify/:type/:email/:token',verifyToken,mailVerification)
router.post('/smsVerification',verifyToken,smsVerification )
router.post('/api/mailVerification',verifyToken,mailVerification)

module.exports = router;