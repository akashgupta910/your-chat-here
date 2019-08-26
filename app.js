const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Init Express
const app = express();

// Middleware
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'dwjfdwjnfwjgbwbwghi', saveUninitialized: false, resave: false }));
app.use(flash());

// Connection to the MongoDB
require('./config/db');

// EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Static file
app.use(express.static('public'));

// Route
app.use('/', require('./routes/index.route.js'));

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server started on PORT ${PORT}`));