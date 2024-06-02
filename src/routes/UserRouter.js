const express = require('express');
const upload = require("../middleware/uploaduser");
const {login, register, getByUserId, update, addTeamMember, getTeamMember} = require("../controllers/UserController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.post('/login',login)
router.post('/register',upload.single("photo"),register)
router.get('/getById/:id',verifyToken, getByUserId)
router.post('/update',verifyToken, update)
router.post('/addTeamMember' ,addTeamMember)
router.get('/teamMember/:id', getTeamMember)

module.exports = router;