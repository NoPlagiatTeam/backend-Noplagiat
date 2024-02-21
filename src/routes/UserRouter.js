const express = require('express');
const upload = require("../middleware/uploaduser");
const {login, register, getByUserId} = require("../controllers/UserController");
const router = express.Router();

router.get('login',login)
router.post('register',upload.single("photo"),register)
router.post('/getById/:id',getByUserId)

module.exports = router;