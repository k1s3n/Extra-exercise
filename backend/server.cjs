const express = require('express');
const bodyParser = require('body-parser');


const app = express();


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


app.post('/', (req, res) => {
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
