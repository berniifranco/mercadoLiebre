const path = require('path');
const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/users'));
    },
    filename: (req, file, cb) => {
        let imageName = 'user-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});

const upload = multer({storage: diskStorage});

module.exports = upload;