const   express = require ("express")
const    exphbs = require("express-handlebars");
const    mongoose = require ("mongoose");
const    bodyParser = require ("body-parser") ;
const    fileupload = require ("express-fileupload"); 
const    expressSession = require("express-session");  
const    MongoStore = require ("connect-mongo"); 
const    connectFlash = require ("connect-flash");
const    {stripTags} = require("./helpers/hbs");
const    methodOverride = require ("method-override");
const    mailer = require("nodemailer");
const    {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
// const    mutler = require("mutler")


/////////////////////////////////////////////////////////
//controllers
//page
const homePage = require ("./controllers/homePage")
const contact = require("./controllers/contact")
const about = require("./controllers/about")
const gallery = require("./controllers/gallery")
const ameublement = require("./controllers/ameublement")
const decoration = require("./controllers/decoration")
const oeuvres = require ("./controllers/oeuvres")
const shop = require ("./controllers/shop")
// const articleSingle = require ("./controllers/articleSingle")

//articles
const articleAdd = require ("./controllers/articleAdd")
const articlePost = require ("./controllers/articlePost")


//category
const categoryAdd = require("./controllers/categoryAdd")
const categoryPost = require("./controllers/categoryPost")
const categoryDelete = require("./controllers/categoryDelete")

//user
const userAdd = require("./controllers/userAdd")
const userRegister = require ("./controllers/userRegister")
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

////////////////////////////////////////////////////////
//express
const app = express();

//const handlebars
const Handlebars = require("handlebars");
Handlebars.registerHelper('moment', require('helper-moment'));
// const MomentHandler = require("handlebars.moment");
// MomentHandler.registerHelpers(Handlebars);

//multer upload
// var uploads = multer({ dest: 'uploads/' })

//mongoose
const db = require ("./config/keys").MongoURI
// mongoose.connect(db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });
mongoose
.connect(db,
 ({ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true }))
 .then(() => console.log("Connecter à Mongo Cloud"))
 .catch(err => console.log(err))

//connect-mongo
const mongoStore = MongoStore(expressSession);
//connect-flash
app.use(connectFlash());

//express-static
app.use(express.static('public'));

//express-session
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',   
    saveUninitialized: true,
    resave: false,
    // cookie: {securite: true},

    store: new mongoStore ({
        mongooseConnection: mongoose.connection}
    ),
}));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//express-file-upload
app.use(fileupload());

//method-override
app.use(methodOverride('_method'));


//Handlebars
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'handlebars',
    helpers: {
        stripTags: stripTags,
        
    }
   
}));
app.set('view engine', 'handlebars');
app.use('*', (req,res, next) => {
    res.locals.user = req.session.userId;
    // console.log(res.locals.user);
    next()
})


/////////////////////////////////////////////////

//auth
const auth = require ('./middleware/auth')
app.use('articles/add', auth)

const redirectAuthSuccess = require ('./middleware/redirectAuthSuccess')


//route index
app.get("/", homePage)

//controllers
app.get("/articles/add", auth, articleAdd)
app.post("/articles/add", auth, articlePost)
app.get("/articles/category", auth, categoryAdd)
app.post("/articles/category", auth, categoryPost)
app.delete("/articles/category/:id", auth, categoryDelete)
// app.get ("/articles/:id", articleSingle)

//User
app.get("/user/add", redirectAuthSuccess, userAdd)
app.post("/user/register",redirectAuthSuccess, userRegister)
app.get ("/user/login",redirectAuthSuccess, userLogin)
app.post ("/user/loginAuth",redirectAuthSuccess, userLoginAuth)
app.get("/user/logout", userLogout)

//route gallery
app.get("/gallery", gallery)
app.get("/ameublement", ameublement)
app.get("/decoration", decoration)
app.get("/oeuvres", oeuvres)
app.get ("/shop", shop)


//route contact
app.get("/contact", contact)

//route about
app.get("/about", about)

//error 404
app.use((req, res) => {
    res.render("error404")
})

//appel du serveur///////////////////////////////
app.listen(6003)
console.log("écoute le port 6003");
