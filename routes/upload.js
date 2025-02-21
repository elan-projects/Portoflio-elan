const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '..', 'uploads');

        if (!fs.existsSync(uploadDir)) {  // Fixed typo from fs.existSync to fs.existsSync
            fs.mkdirSync(uploadDir, { recursive: true }); // Ensure recursive creation
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {  // Fixed typo from filenmae to filename
        cb(null, Date.now() + "-" + file.originalname.replace(/ /g, "_"));
    },
});

const upload = multer({ storage: storage }).single("image");

module.exports = upload;
