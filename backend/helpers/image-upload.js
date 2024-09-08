const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";

        if(req.baseUrl.includes("user")) {
            folder = "user";
        } else if(req.baseUrl.includes("products")) {
            folder = "products";
        }

        cb(null, `public/img/${folder}`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const imageUpload= multer({
    storage: storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    },
});

module.exports = { imageUpload }
