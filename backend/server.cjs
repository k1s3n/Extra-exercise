const express = require('express');
const bodyParser = require('body-parser');
//const sqlite3 = require('sqlite3').verbose();


const app = express();

//const db = new sqlite3.Database('./database.db')

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

app.get('/allpersons', (req, res) => {
  const query = 'SELECT * FROM x';
  db.all(query, [], (err, rows) => {
    if(err) {
      return res.status(500).json({ message: err.message});
    }
    res.json(rows);
  });
});

app.post('/personas/:id', (req, res) => {
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
