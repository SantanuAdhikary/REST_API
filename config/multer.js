const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{

        cb(null, "public/upload-images")
    },
    filename : (req, file , cb) =>{
        cb(null, Date.now() + file.originalname);
    }
})

multer({storage: storage})

module.exports = {storage };