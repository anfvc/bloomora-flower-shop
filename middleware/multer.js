import multer from "multer";

let storage;

if (process.env.NODE_ENV === "DEVELOPMENT") {
  storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "client/public");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
    limits: { fileSize: 150000 }, // 150kb
  });
} else {
  storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "client/dist");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
    limits: { fileSize: 150000 }, // 150kb
  });
}

// storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "uploads/");
//   },
//   filename: (req, file, callback) => {
//     return callback(null, Date.now() + file.originalname);
//   }, // filename is unique with Date.now()
//   limits: { fileSize: 150000 },
// });

const upload = multer({ storage: storage });

export default upload;
