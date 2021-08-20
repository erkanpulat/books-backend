const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  // destination directory
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/books"));
  },
  // file name
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!(file.mimetype == "image/jpeg" || file.mimetype == "image/png")) {
    // error message
    req.file_error = "Sadece .png ve .jpeg uzantılı resim yükleyebilirsiniz.";
    return cb(null, false);
  }
  return cb(null, true);
};

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
});

module.exports = { imageUpload };
