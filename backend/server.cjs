const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Ersätt med din frontend URL
}));


app.use(bodyParser.json());

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../database/hobbyhub.db');

app.get('/', (req, res) => {
  db.all('SELECT * FROM person', [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    rows.forEach((row) => {
      console.log(row.name);
    });
  });
  res.send('GET-request mottagen');

});

app.get('/persons/:name', (req, res) => {
  const query = 'SELECT * FROM person WHERE LOWER(name) = LOWER(?)';
  db.get(query, [req.params.name], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(row);
  });
});

app.get('/allpersons', (req, res) => {
  const query = 'SELECT * FROM person';
  db.all(query, [], (err, rows) => {
    if(err) {
      return res.status(500).json({ message: err.message});
    }
    res.json(rows);
  });
});

app.post('/personas', (req, res) => {
  console.log('POST-data:', req.body);
  db.run('INSERT INTO person (name, info) VALUES (?, ?)', [req.body.name, req.body.info], function(err) {
    if (err) {
      console.error(err.message);
    }
  });
  res.send('POST-request mottagen');
});


app.listen(3001, () => {
  console.log('Server http://localhost:3001');
});
