const bcrypt = require('bcryptjs');


const helpers = {
  isAuthenticated: isAuthenticated,
  encryptPassword: encryptPassword,
  matchPassword: matchPassword

};

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not Authorized.');
  res.redirect('/users/signin');
};


async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

async function matchPassword(password, upass) {
  return await bcrypt.compare(password, upass);
};

module.exports = helpers;
