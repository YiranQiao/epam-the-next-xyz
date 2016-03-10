// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongoose=require('mongoose');
var mongoosecon=require('./config/mongoose');
    passportConfig = require('./config/passport');
var passport=require('passport');
var session = require('express-session');
var db = mongoosecon();
//connect to Mongoose
// mongoose.connect('mongodb://localhost/test');
// var Schema=mongoose.Schema;

var Article=mongoose.model('Portery');

var User=mongoose.model('User');
// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');
// // Configure the Passport middleware
var passportConfig=new passportConfig();
// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        grouped_each: function (every, context, options) {

          var out = "", subcontext = [], i;
          if (context && context.length > 0) {
              for (i = 0; i < context.length; i++) {
                  if (i > 0 && i % every === 0) {
                      out += options.fn(subcontext);
                      subcontext = [];
                  }
                  subcontext.push(context[i]);
              }
              out += options.fn(subcontext);
          }
          return out;

        }
    }
  });

// crethe the express app
var app = express();

var api = require('./routes/api');

// setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// setup express session
app.use(session({ secret: 'anything' }));

// express middleware that parser the key-value pairs sent in the request body in the format of our choosing (e.g. json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// setup passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// setup our public directory (which will serve any file stored in the 'public' directory)
app.use(express.static('public'));

// respond to the get request with the home page
app.use(function (req, res, next) {
 res.locals.scripts = [];
 next();
});


app.get('/', function (req, res) {
   // res.locals.scripts.push('/js/home.js');
   Article.find({},null,{sort:{data:-1}},function(err,data){
    if(err) throw err;
    res.render('home',{data:data});
  });

});
// respond to the get request with the about page
app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/articles/:id', function (req, res) {

   Article.findById(req.params.id,function(err,article){
    if(err) throw err;
    res.render('articles',{article:article});

  });

});


// respond to the get request with the register page
app.get('/register', function(req, res) {
  res.render('register');
});

// // handle the posted registration data



app.post('/register', function(req, res) {

  // get the data out of the request (req) object
  // store the user in memory here
  //console.log(req.body);

     var user = new User(req.body);
     user.save(function(err, user) {
      if (err) {
        console.log(err);
        // do something
        res.send(404);
      }
       res.render('login',{flash:"Register successfully"});
     });
});

//respond to get and post login
app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login',function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', info.message);
      return res.render('login',{flash: req.flash('errors')});
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      req.flash('success', 'Login successfully!');
      res.render('dashboard',{user:user,message:"Welcome", flash: req.flash('success') });
    });
  })(req, res, next);
});

// respond to the get request with dashboard page (and pass in some data into the template / note this will be rendered server-side)
app.get('/dashboard', function (req, res) {

   if(req.isAuthenticated()){
    res.render('dashboard', { user: req.user });
  }
  else{
    res.redirect('/login');
  }
});

app.get('/createarticles', function (req, res) {
    res.locals.scripts.push('/js/createarticles.js');
    res.render('createarticles');
});


// the api (note that typically you would likely organize things a little differently to this)
app.use('/api', api);


// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1337, '127.0.0.1', function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});