const multer = require("multer");
const fs = require("fs");
const path = require("path");

const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  };
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath;
  
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        uploadPath = path.join(__dirname, "../uploads");
      } else if (file.mimetype === "application/pdf") {
        uploadPath = path.join(__dirname, "../uploads/pdf");
      } else {
        return cb({ message: "Unsupported file format" }, false);
      }
  
      ensureDirectoryExists(uploadPath); // Ensure the directory exists
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + "-" + file.originalname;
      console.log("file name:",filename);
      cb(null, filename);
    },
  });
  
  const upload = multer({ storage: storage });
  module.exports=upload;