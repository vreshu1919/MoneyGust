
let passport = require('passport');
let Schema = require('../database/schema');
let LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user,done) {
    console.log("Sserialize");
    done(null,user.id);
});

passport.deserializeUser(function (id,done) {
    console.log("startupdeserialize");
    Schema.startup.findById(id,function (err,user) {
        console.log("start");
        done(err,user);
    });

});

passport.use('local.signup',new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
},function (username,password,done) {
    console.log("pass " + username);
    console.log("pass " + password);
    Schema.startup.findOne({'Email': username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if(user==null) {
            console.log("StaMail");
            return done(null,false,{ message: 'Incorrect Email' })
        }
        if (user.Password !== password) {
            console.log("Stapass");
            return done(null, false, {message: 'Wrong password'})
        }
        return done(null, user);
    });
}));

