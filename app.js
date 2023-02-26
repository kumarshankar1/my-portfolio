const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const cookieSession = require("cookie-session");
const fileUpload = require('express-fileupload');
const path = require('path');
const hbs = require('hbs');
var bodyParser = require('body-parser');
var helpers = require('./components/hbsHelpers');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

app.use(
    cookieSession({
      name: "session",
      keys: ["keyboard cat"],
      maxAge: 72 * 60 * 60 * 1000, // 72 hours
    })
  );
  //Use for have session or not
  app.use(function (req, res, next) {
    const sess = req.session;
   res.locals.email = sess.email;
  
    next();
  });

  for (let helper in helpers) {
    hbs.registerHelper(helper, helpers[helper]);
}

//Setting the path
const staticpath = path.join(__dirname, "./public");
const templatepath = path.join(__dirname, "./templates/views");
const partialpath = path.join(__dirname, "./templates/partials");
//console.log(path.join(__dirname, "../public/admin"));

//middliware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

//app.use('/public', express.static(path.resolve(__dirname, "../public")))
app.use(express.static(staticpath));

//set the view
app.set('view engine', 'hbs');
app.set('views', templatepath);
hbs.registerPartials(partialpath);

app.use(fileUpload({
    createParentPath: true
}));

const router = require('./routes/index')(app);

var PORT = process.env.PORT || 4000;
const db = require('./config/dbConnect')
// app.get("/", (req, res, next) => {
//     res.render('login');
// })

app.get("/", (req, res, next) => {
    if (req.session.loggedin) {
        res.redirect('admin/dashboard');
    } else {
        res.render('login');
    }
});

app.use(notFound);
app.use(errorHandler)

app.listen(process.env.PORT, ()=>{
    console.log(`The Server Has Been Running On Port ${PORT}`)
})