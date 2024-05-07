const express = require('express');
const bodyParser = require('body-parser');
//const sqlite3 = require('sqlite3').verbose();


const app = express();

//const db = new sqlite3.Database('./database.db')

app.use(bodyParser.json());


app.get('/', (req, res) => {
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
  const query = 'SELECT * FROM persons WHERE id = ?';
  db.get(query, [req.params.id], (err, row) => {
    if(err){
      return res.status(500).json({ message: err.message});
    }
    if (!row){
      return res.status(404).json({ message: "person not found"});
    }
    res.json(row);
  });
});


app.listen(3001, () => {
  console.log('Server http://localhost:3001');
});
