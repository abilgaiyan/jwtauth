const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create a local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email,password,done){
 //verify this username and password, call done with the user
 // If it is correct username and password
 //otherwise, call done with false   

 User.findOne({email: email}, function(err,user){
        if (err){ return done(err, false);}
        if (!user){ return done(null, false);}

        // Compare password with the stored password.
        user.comparePassword(password, function(err,isMatch){
          if (err){return done(err,false);}
          if (!isMatch){ return done(null, false);}

          return done(null,user);
        });
 });

});

//Setup option for jwt strategy
const jwtOptions ={
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//Create the strategy
const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
 // See if the userid in payload exists in our database
 // If it does, call 'done' with that user
 //otherwise, call done without a user object
 User.findById(payload.sub, function(err, user){
        if (err){
         return   done(err,false);
        }
        if (!user){
           done(null,false)
        }

           done(null,user);

 });

});

//Tell passport to this strategy
passport.use(jwtLogin);
passport.use(localLogin);