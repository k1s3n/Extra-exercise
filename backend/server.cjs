const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('GET-request mottagen');
});

app.get('/persons', (req, res) => {
  const query = 'SELECT * FROM '
  res.send('GET-request mottagen');
});
)


app.post('/', (req, res) => {
  console.log('POST-data:', req.body);
  res.send('POST-request mottagen');
});


app.listen(3001, () => {
  console.log('Server http://localhost:3001');
});
