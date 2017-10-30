const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define our modal
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String
});

//On Save, hook encrpt password
//Before saving a model, run this function
userSchema.pre('save', function(next){
    // get access to user modal
    const user = this;

    //check if password field is modified
    if (!user.isModified('password')){
        return next();
    }
    //generate a salt than run callback.
    bcrypt.genSalt(10, function(err, salt){
      if(err) { return next(err);}
      
      //hash (encrypt) our password using salt    
      bcrypt.hash(user.password, salt, null, function(err,hash){
          if (err){ return next(err);}

          //Overwrite the plain password with encrypted password.
          user.password = hash;

          next();
      })
    });

});

//method for compare password

userSchema.methods.comparePassword = function(candidatePassword,callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err){ return callback(err);} 
        
        callback(null, isMatch);
    });
}

//Create the modal class
const ModalClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModalClass;

