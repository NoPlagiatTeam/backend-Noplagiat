const express = require('express');
const {mailVerification, smsVerification} = require("../controllers/TokenController");
const router = express.Router();

router.get('/mailverify/:type/:email/:token',mailVerification)
router.post('/smsVerification',smsVerification )
router.post('/api/mailVerification',mailVerification)

module.exports = router;