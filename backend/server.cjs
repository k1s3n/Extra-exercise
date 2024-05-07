const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('GET-request mottagen');
});


app.post('/', (req, res) => {
  console.log('POST-data:', req.body);
  res.send('POST-request mottagen');
});


app.listen(3001, () => {
  console.log('Server körs på port 3001');
});
