//import
// var bcrypt=require('bcrypt');
var jwtUtils  = require('../utils/jwt.utils');
var models=require('../models');


//routes
module.exports={

    register:function(req,res){
        var email=req.body.email;
        var username=req.body.username;
        var password=req.body.password;
       

       if(email==null || username==null ||password==null){
           return res.status(400).json({'error':'missing parametre'});
       } 

       if(username.length<=3){
            return res.status(400).json({'error':'wrong username doit etre sup a 3'});
        } 

//TODO verify parametre
            var newUser=models.User.create({
                email:email,
                username:username,
                password:password
            })
            .then(function(newUser){
                
              // return res.status(201).json({'user name':newUser.username})
                res.status(200).redirect('/login.html')
            })
            .catch(function(err){
                return res.status(500).json({'error':'cannot add user'})
            })
    },
    //fonction login
    login:function(req,res){

        var email=req.body.email;
        var password=req.body.password;
       

       if(email==null ||password==null){
           return res.status(400).json({'error':'missing parametre'});
       } 

       models.User.findOne({
        where: { email: email,password:password }
      })
      .then(function(userFound) {
          if(userFound){

            models.Event.findAll({
              attributes: [ 'id', 'title', 'content', 'createdAt' ],
            // where: { idUSERS: userId }
            }).then(function(event) {
              if (event) {
                var token= jwtUtils.generateTokenForUser(userFound)
            console.log(token)
            res.cookie('authorization',token); //Sets name = express
            //   //        });
            //  console.log( jwtUtils.getUserId(token))
            req.session.userId = 1  
            res.render('index',{userFound:userFound,event:event,nav: ['test1','about','Contact','logout']});
              

              //res.status(200).redirect('/index1.html')
                // res.status(201).json(event);
                //res.render('view',{userFound:userFound,event:event});
                // res.render('/include/view',{event:event});
              } else {
                res.status(404).json({ 'error': 'messaage not found' });
              }
            }).catch(function(err) {
              res.status(500).json({ 'error': 'cannot fetch message' });
            });

          
            
          }
          else{
            return res.status(500).json({ 'error': 'user pas trouver' });
          }
       
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user' });
      });
        

    },

    test:function(req,res){
        res.status(200).json({'bonjour':'bonjour test'});
    },

    getUser: function(req, res) {

        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

      models.User.findOne({
        attributes: [ 'id', 'email', 'username'],
        where: { id: userId }
      })
      .then(function(user) {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch user' });
      });

      },

      //get all user
      about:function(req,res){

      //   var headerAuth  = req.headers['authorization'];
      //   var userId      = jwtUtils.getUserId(headerAuth);

      //   if (userId < 0)
      // return res.status(400).json({ 'error': 'wrong token' });

      models.User.findAll({
        attributes: [ 'id','email', 'username','createdAt']
      })
      .then(function(userFound) {
        if (userFound) {


        

           
             res.render('include/stat',{userFound:userFound});
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch user' });
      });

      
    
    },
    test1:function(req,res){

      models.Event.findAll({
        attributes: [ 'id', 'title', 'content', 'createdAt' ],
      // where: { idUSERS: userId }
      }).then(function(event) {
        if (event) {
          // res.status(201).json(event);
           res.render('include/view',{event:event});
        } else {
          res.status(404).json({ 'error': 'messaage not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch message' });
      });;
    },
    logout:function(req,res){

      console.log(req.session)
      console.log(req.session.id)
      // console.log(req.get('cookie'))

     req.session.destroy(err => {
     res.clearCookie('sid')

     res.redirect('/')
  })
    }
      
    }

