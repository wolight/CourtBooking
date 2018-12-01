var express = require('express');
var path = require('path');
var app = express();

// session
var session = require('express-session');
app.use(session({
    name: 'courtbooking',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));


//boday parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Parse JSON and make sure that it's not empty
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.post('*', jsonParser, function(req, res, next) {
    if (!req.body) return res.sendStatus(400);
    next();
});


// // TODO: Reads bearer authorization token
// var bearerToken = require('express-bearer-token');
// app.use(bearerToken());
//
// // TODO: JSON web token
// var jwt = require('jwt-simple');
// var secret = 'QbSqjf3v1V2sMHyeo27W';
//
// // TODO: Function for generating token
// var generateToken = function(userID) {
//     var date = new Date();
//     var payload = {
//         userID: userID,
//         exp: date.setHours(date.getHours() + 1)
//     };
//     return jwt.encode(payload, secret);
// };
//
// // TODO: Authentication
// app.all('*', jsonParser, function(req, res, next) {
//     if (req.token) {
//         var decodedToken = jwt.decode(req.token, secret);
//         if (decodedToken && new Date(decodedToken.exp) > new Date()) {
//             // Check if user exists and is admin
//             userModel.find({ studentNum: parseInt(req.params.id) }).toArray(function(err, docs) {
//                 _id: decodedToken.userID
//             }).toArray(function(err, docs) {
//                 if (docs.length > 0) {
//                     req.studentNum = docs[0].studentNum;
//                     req.email = docs[0].email;
//                     req.phoneNum = docs[0].phoneNum;
//                     req.firstname = docs[0].firstname;
//                     req.lastname = docs[0].lastname;
//                     req.icon = docs[0].icon;
//                 }
//                 next();
//             });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

//set statics
app.use(express.static(path.join(__dirname, 'statics')));
//set views
app.set('views', path.join(__dirname, 'views'));
//using ejs as display engine, and set html as ejs
app.engine('.html', require('ejs').__express);


//db stuff
var mongoose = require('mongoose');
var mongoURL = 'mongodb://localhost:27017/courtbooking';
mongoose.connect(mongoURL);
var db = mongoose.connection;
var courtModel = require('./models/court');

//uncatched error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
})


//Set routers
var searchRouter = require('./routes/search');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var bookingRouter = require('./routes/booking');
var adminRouter = require('./routes/admin');
var courtRouter = require('./routes/court');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/search', searchRouter);
app.use('/booking', bookingRouter);
app.use('/court', courtRouter);
app.use('/admin', adminRouter);

//set quick search variable
//quick search use a globle to temparaily save the value
//by pressing enter after typing something in quick search,
//it will redirect to search page, and search page will invoke an ajax call
//to see if there is anything in quick search, then perform a seach
//if there is nothing in quick search, search won't triggers
//use ip to differentiate users
var quick_search = {};
app.post('/qs', function(req, res) {
    quick_search[req.ip] = req.body.court;
});

app.get('/qs', function(req, res) {
    res.send(quick_search[req.ip]);
    delete quick_search[req.ip];
});


app.listen(3000, function() {
    console.log('Listening on 3000')
});