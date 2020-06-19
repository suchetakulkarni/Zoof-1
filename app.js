var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/order");

var configDB = require('./config/database.js');

mongoose.connect(configDB.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

  require('./config/passport')(passport);



// app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser());
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'zoofstore' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
})
app.use(flash());
app.use(express.static('public'))

app.get('/', (req, res)=> res.redirect('/home'))
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
require('./routes/user.js')(app, passport);

app.listen(port);
console.log('Hosted on ' + port);