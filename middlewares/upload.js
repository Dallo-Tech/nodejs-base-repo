const util = require("util");
const multer = require("multer");
const API = require("../constant/API").API;
const maxSize = 25 * 1024 * 1024;
const { v4: uuidv4 } = require("uuid");

const fileFilter = function (req, file, cb) {
  // Accept images only
  console.log(file);
  if (
    !file.originalname.match(
      /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|PDF|pdf|DOCX|docx)$/
    )
  ) {
    req.fileValidationError = "File format not supported!";
    return cb(new Error("File format not supported!"), false);
  }
  cb(null, true);
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, API.FILE_STORE_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      uuidv4().replace(/-/g, "") +
        "-" +
        file.originalname.replace(/[&\/\\#,+()$~%'":*?<>{}-]/g, "")
    );
  },
});

let uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
