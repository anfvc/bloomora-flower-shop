import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    return callback(null, Date.now() + file.originalname);
  }, // filename is unique with Date.now()
  limits: { fileSize: 150000 },
});

const upload = multer({ storage: storage });

export default upload;
