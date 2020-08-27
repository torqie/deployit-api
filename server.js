require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./database'); // loads our connection to the mongo database
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require('./routes');
const path = require('path');



// Middleware
// =============================================================
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
      secret: process.env.APP_SECRET || 'somethingawsome',
      store: new MongoStore({ mongooseConnection: dbConnection }),
      resave: false,
      saveUninitialized: false
    })
);

// Passport
// =============================================================
app.use(passport.initialize());
require('./config/passport')(passport);





// API Routing
// =============================================================
app.use(routes);

// Static Files
// =============================================================
app.use(express.static(path.join(__dirname, 'public')));

// Error handler
// =============================================================
app.use(function(err, req, res, next) {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});

// Start The Server
// =============================================================
app.listen(PORT, () => {
  console.log(`API Server listening on PORT: ${PORT}`);
})

module.exports = app;
