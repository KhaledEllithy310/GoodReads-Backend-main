const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "assets/users_up");
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`;
      cb(null, fileName);
    },
  });
  const upload = multer({ storage }).single("avatar");


  module.exports = upload