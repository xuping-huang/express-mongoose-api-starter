const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const debug = require('debug')('apiKit:auth.User');

const config = require('../config/env-config');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  steam: String,
  tokens: Array,

  file: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 *
 * The password send by request client should be encoded like below:
   const encodeData = crypto.publicEncrypt(publicKey, Buffer.from(password)).toString('base64');
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  debug('candidatePassword is %s', candidatePassword);
  try {
    const password = crypto.privateDecrypt(config.privateKey,
      Buffer.from(candidatePassword.toString('base64'), 'base64'));
    debug('decode password is %s', password);
    debug('user password is %s', this.password);

    bcrypt.compare(password.toString(), this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  } catch (err) {
    cb(err, false);
  }
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);


module.exports = User;
