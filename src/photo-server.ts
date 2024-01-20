// 2024 Sticky Piston Studios. MIT license

// src/photo-server.ts
import express, { Request, Response } from 'express';
import * as path from 'path';
import multer, { Multer, StorageEngine } from 'multer';

const app = express();
const port = 3000;

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload: Multer = multer({ storage });

app.use('/uploads', express.static('../uploads'));
app.use(express.static(path.join(__dirname, '../dist'))); // Serve static files from dist

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.post('/upload', upload.array('photos', 5), (req: Request, res: Response) => {
  res.send('Photos uploaded successfully!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

