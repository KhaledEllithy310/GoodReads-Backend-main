const multer = require("multer");

const storage = (folderPath) => multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, fileName);
  },
});

const uploadImage = (folderPath) => {
  const storageInstance = storage(folderPath);
  const upload = multer({ storage: storageInstance }).single("avatar");
  return (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json({ error: "UPLOAD_ERR" });
      }
      next();
    });
  };
};

module.exports = uploadImage;