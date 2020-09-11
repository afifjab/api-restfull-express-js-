var jwtUtils  = require('../utils/jwt.utils');
var models=require('../models');


module.exports={

    addevent:function(req,res){

      console.log('Cookies: ', req.cookies);
      // Getting auth header
      var headerAuth  = req.cookies['authorization'];
      var userId      = jwtUtils.getUserId(headerAuth);

        // var headerAuth  =req.headers['authorization'];//req.headers['authorization'];
        // var userId      = jwtUtils.getUserId(headerAuth);
        console.log(userId);

        if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token' });

       // Params
       var title   = req.body.title;
       var content = req.body.content;


       if (title == null || content == null) {
           return res.status(400).json({ 'error': 'missing parameters' });
         }

         models.User.findOne({
           attributes:['id'],
           where:{id:userId}
       })
       .then(function(userFound){
           if(userFound){
                   var newEvent=models.Event.create({
                       title  : title,
                       content: content,
                       idUsers : userFound.id
               })
               .then(function(newEvent){
                   return res.status(200).json({
                       'title':newEvent.title,
                       'content':newEvent.content,
                       'info':'bien ajouter event'
                  
                  })
                 
                

              
                //    return res.status(200).json({'Event':'bien ajouter Event'});
               })
               .catch(function(err){
                   return res.status(500).json({'error':'cannot add Event'});
               })
           }else{
               return res.status(409).json({'error':'user not exist'});
           }
       }) 
       .catch(function(err){
           return res.status(500).json({'error':'unable to verif Event'});
       }) 
    },
    getAllEvent:function(req,res){

       
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);
    
        if (userId < 0)
          return res.status(400).json({ 'error': 'wrong token' });
    
        models.Event.findAll({
          attributes: [ 'id', 'title', 'content', 'createdAt' ],
        // where: { idUSERS: userId }
        }).then(function(event) {
          if (event) {
            res.status(201).json(event);
            // res.render('/include/view',{event:event});
          } else {
            res.status(404).json({ 'error': 'messaage not found' });
          }
        }).catch(function(err) {
          res.status(500).json({ 'error': 'cannot fetch message' });
        });

    },
    test1:function(req,res){

        let test='ceci est un test de ejs';
        let test2='kais president';
        // res.render('test',{test:test,t:test2});
      }

}