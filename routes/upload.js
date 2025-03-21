const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {  
            fs.mkdirSync(uploadDir, { recursive: true }); 
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {  
        cb(null, Date.now() + "-" + file.originalname.replace(/ /g, "_"));
    },
});
const upload = multer({ storage: storage }).single("image");
module.exports = upload;
