# Passport Authentication

## Local Strategy

`POST /auth/user` is used to auth by local strategy. This API checks whether the user name and password match the saved in the database. The password should be encrypted by RSA.

Local strategy implemented in these files: `common/passport.js`, `auth/auth.user.js`, `model/User.js`.

  - *Notice*: the code below may be few diffrents with the real code. 

### passport.js

> Register the passport's local strategy. Manage the auth process.

```
passport.use(new LocalStrategy({
  usernameField: config.login.userNameField,
  passwordField: config.login.passwordField
}, (username, password, done) => {
  const query = {};
  query[config.login.userNameField] = username.toLowerCase();

  User.findOne(query, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(new AuthenticateError(`User account ${username} not found.`));
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (isMatch) {
        return done(null, user);
      }
      return done(new AuthenticateError('Invalid user account or password.'));
    });
  });
}));
```

### User.js

> Implement `comparePassword` to check the passwords match. Password will be hashed before save to db.
>  
```
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  try {
    // The password send by request client should be encoded like below:
    // const encodeData = crypto.publicEncrypt(publicKey, Buffer.from(password)).toString('base64');
    const password = crypto.privateDecrypt(config.privateKey,
      Buffer.from(candidatePassword.toString('base64'), 'base64'));

    bcrypt.compare(password.toString(), this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  } catch (err) {
    cb(err, false);
  }
};

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
```

### auth.user.js

> Implement local strategy auth.

```
exports.authLocalRSA = (req, res, next) => {
  req.assert(config.login.userNameField, `${config.login.userNameField} cannot be blank`).notEmpty();
  req.assert(config.login.passwordField, `${config.login.passwordField} cannot be blank`).notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return next(new BadRequestError(`${config.login.userNameField} and ${config.login.passwordField} is required.`));
  }

  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new AuthenticateError('User not found.'));
    }
    const token = jwt.sign({
      username: user[config.login.userNameField]
    }, config.jwt.privateKey, {
      expiresIn: '1h'
    });
    return res.json({
      token,
      username: user[config.login.userNameField]
    });
  })(req, res, next);
};

```
