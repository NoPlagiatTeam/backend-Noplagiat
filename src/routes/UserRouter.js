const express = require('express');
const upload = require("../middleware/uploaduser");
const {login, register, getByUserId} = require("../controllers/UserController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.post('/login',login)
router.post('/register',verifyToken,upload.single("photo"),register)
router.get('/getById/:id',verifyToken, getByUserId)

module.exports = router;