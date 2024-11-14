// import multer from "multer";

// const upload = multer({dest: 'upload'});

// export default upload;

import multer from "multer";
import path from "path";

// Custom storage settings for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload'); // Directory where files are stored
  },
  filename: (req, file, cb) => {
    // Rename the file with the current timestamp and preserve the original extension
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with the custom storage
const upload = multer({ storage: storage });

export default upload;
