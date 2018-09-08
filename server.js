const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = require('./config/keys').mongoURI;
//route definition
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// connect to mongo db through mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => { console.log('mongo db connected....') })
  .catch((err) => { console.log('error connecting to mongo:', err) });

app.get('/', (req, res) => res.send('hello!'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Server running on port: ${port}`) });