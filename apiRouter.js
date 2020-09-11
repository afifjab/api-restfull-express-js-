//import
var express=require('express');
var usersCtrl=require('./routes/usersCtrl');
var eventCtrl=require('./routes/eventCtrl');


//router
exports.router=(function(){
    var apiRouter=express.Router();

    //user router
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/getUser/').get(usersCtrl.getUser);
    apiRouter.route('/users/about/').get(usersCtrl.about);
    apiRouter.route('/users/test1/').get(usersCtrl.test1);
    apiRouter.route('/users/logout/').get(usersCtrl.logout);
    //event
    apiRouter.route('/event/addevent/').post(eventCtrl.addevent);
    apiRouter.route('/event/getAllEvent/').get(eventCtrl.getAllEvent);
    apiRouter.route('/event/test/').get(eventCtrl.test1);
    return apiRouter;
})();
