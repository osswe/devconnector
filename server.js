const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const db = require('./config/keys').mongoURI;

//route definition
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongo db through mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true },
  )
  .then(() => {
    console.log('mongo db connected....');
  })
  .catch(err => {
    console.log('error connecting to mongo:', err);
  });

// passport
app.use(passport.initialize());

// passport config/strategy
require('./config/passport')(passport);

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
