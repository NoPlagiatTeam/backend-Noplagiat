const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/pdf':'pdf',
    'text/plain':'docx'
};

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, 'downloaded_pdfs');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.pdf')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' +Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage});