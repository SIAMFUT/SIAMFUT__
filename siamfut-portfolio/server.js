const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('Public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Public/Images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});
app.get('/', (req, res) => {
  res.send('Welcome! Server is running.');
});
const fs = require('fs');

app.get('/api/images', (req, res) => {
  const dirPath = path.join(__dirname, 'Public/images');
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read image directory' });
    }
    // Only return image files
    const imageFiles = files.filter(file =>
      ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(path.extname(file).toLowerCase())
    );
    res.json(imageFiles);
  });
});
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});

