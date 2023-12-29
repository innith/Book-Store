const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/books');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(routes);

app.listen(port,()=>{
  console.log('App listening on port 3000');
})