const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const userModel = require("./models/user")
const urlModel = require("./models/url")
const rateLimit = require("express-rate-limit");
const routes = require("./routes/routes")
require("dotenv").config()

const app = express()
const port = process.env.PORT    

const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//Session middleware
app.use(session({
    secret: process.env.session_secret,
    resave: false,//session data should not be saved to the session store on every request
    saveUninitialized: true,//a new empty session should be created for every request
    cookie: { maxAge: 60 * 60 * 1000 }//session lasts 5 minutes 
}))

app.use(express.json())//JSON middleware
app.use(express.urlencoded({extended: false}))//Accessing forms in req variable
app.use(express.static('public'))//access to public folder
app.use(passport.initialize())//Initialize Passport middleware
app.use(passport.session())//Session for Passport to store serialized user object
app.use(limiter)// Apply the rate limiting middleware to all requests

app.set("view engine", "ejs")
app.set("views", "views")

passport.use(userModel.createStrategy())//Authentication strategy (username/password)
passport.serializeUser(userModel.serializeUser());//serialize the user object to and from the session
passport.deserializeUser(userModel.deserializeUser());//deserialize the user object to and from the session

//Database connection
mongoose.set('strictQuery', true)
mongoose.connect(process.env.url)
.then(()=>{
    console.log(`Connected to the mongo database successfully`)
}).catch((err)=>{
    console.log(`Database connection error: ${err}`)
})

app.use("/scissor", routes) 

app.get("/register", (req, res)=>{
    res.status(200)
    res.render("register")
})

app.get("/login", (req, res)=>{
    res.status(200)
    res.render("login")
})

//Handles the signup request for new users
app.post("/register", (req, res)=>{
    const {username, password} = req.body
    userModel.register(new userModel({ username: username }), password, (err, user) => {
        if (err){
            console.log(err);
            res.status(400).redirect("/register");
        } else {
            passport.authenticate('local')(req, res, async () => {
                await urlModel.create({long: " ", short: " ", real:1})
                res.status(201).redirect("/scissor/urlpage")
            });
        } 
    });
})

//Handles the login request for existing users
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), async (req, res) => {
    await urlModel.create({long: " ", short: " ", real:1})
    res.status(200).redirect("/scissor/urlpage")
});

//Handles the logout request
app.get('/logout', (req, res) => {
    req.logout(()=>{
        res.status(200).redirect("/scissor")
    })    
}); 

//catch errors middleware
app.use((err, req, res, next) => {  
    console.log(err);    
    res.status(500).json({message: 'something broke', error: err});
});

module.exports = app 