const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = require('./config/keys').mongoURI;

// connect to mongo db through mongoose
mongoose
  .connect(db)
  .then(() => { console.log('mongo db connected....') })
  .catch((err) => { console.log('error connecting to mongo:', err) });

app.get('/', (req, res) => res.send('hello!'));

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Server running on port: ${port}`) });