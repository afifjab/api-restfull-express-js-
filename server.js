//import
var express = require('express')  // Appelle de la dépendance
var bodyParser=require('body-parser')
var apiRouter=require('./apiRouter').router;
var session=require('express-session')
var cookieParser = require('cookie-parser');


const heur=2
//instancier le server
var server = express()

// configure bodyparser
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cookieParser());

server.use(express.static('./public'));
server.set('views','./public');
server.set('view engine','ejs');

server.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret:'afif',
    cookie: { 
        expires:heur,
        maxAge : heur,
        secure: true 
    }
  }))

//configure le route
server.get('/',function(req,res){
    // res.setHeader('content-type','text/html')
    // res.status(200).send("<h1>bonjour server :)</h1>")
    res.sendFile(__dirname+'/public/login.html');
})

server.use('/api/',apiRouter);


// lanche server
server.listen(4500,function(req,res){
    console.log("server running on port 4500 :)")
})