const multer  = require('multer')
const fs = require('fs');
const directoryExist = require("./utils");

const directory = 'api/uploads/users/';

directoryExist(directory)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, directory);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

module.exports=upload