const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 1234;

app.use(cors());
app.use(express.static('public')); // папка з HTML/CSS/JS

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'autobought_db'
});

db.connect(err => {
  if (err) {
    console.error('Помилка підключення до бази даних:', err);
  } else {
    console.log('Підключено до бази даних MySQL');
  }
});


const multer = require('multer');
const path = require('path');

// Налаштування для збереження файлів
const storage = multer.diskStorage({
  destination: 'public/static/uploads',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/create', upload.single('image'), (req, res) => {
  const {
    name, price, year,
    engine_volume, transmission_type, mileage
  } = req.body;

  const image_url = req.file ? '/static/uploads/' + req.file.filename : null;

  const query = `
    INSERT INTO car_adverts 
    (name, price, year, engine_volume, transmission_type, mileage, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, price, year, engine_volume, transmission_type, mileage, image_url], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Помилка при створенні оголошення' });
    }
    res.json({ message: 'Оголошення додано', redirect: '/index.html' });
  });
});


app.get('/adverts', (req, res) => {
  db.query('SELECT * FROM car_adverts ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Помилка отримання оголошень' });
    }
    res.json(results);
  });
});


app.delete('/adverts/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM car_adverts WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Помилка при видаленні' });
    }
    res.json({ message: 'Оголошення видалено' });
  });
});


app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});