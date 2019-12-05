const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDao = require('../dao/userDao'); 

const  isAuthenticated  = require('../helpers/auth');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // Match Email's User
  const user = await userDao.getByEmail(email);
  console.log("user:" +  JSON.stringify(user));
  if (!user) {
    return done(null, false, { message: 'Not User found.' });
  } else {
    // Match Password's User
    const match = await isAuthenticated.matchPassword(password, user.password);
    console.log("Match"+ match);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect Password.' });
    }
  }

}));

passport.serializeUser((user, done) => {
  console.log("serializeUser euser:" + JSON.stringify(user));
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  userDao.getById(_id).then((user)=>{
      done(null, user);
    }).catch((err)=>{
      done(err, null);
    });
});
