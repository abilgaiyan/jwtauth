const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');


function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);

}

exports.signin = function(req,res,next){
    //User has already had their email and password authorize
    //We just need to give then token

    res.send({token: tokenForUser(req.user)});

}
exports.signup = function(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    // check if email and password exists
    
    if (!email || !password){
        return res.status(422).send({error:'You must provide email and password'});
    }

 //See if the user with given email exists
 User.findOne({email: email}, function(err,existingUser){
  if (err){ return next(err); }

  

  //If the user with email does exists, return error
  if (existingUser){
      return res.status(422).send({error:'Email is in use'});
  }

 //If the user with email does not exists, create and save  user record
 const user = new User({email: email, password:password});
 user.save(function(err){
     if (err){ return next(err);}
 //Respond to request indicating the user was created
   //res.json(user);  
   res.json({token: tokenForUser(user)});  
 })
 


});

 

}
