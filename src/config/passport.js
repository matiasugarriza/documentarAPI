const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const { createHash, isValidPassword } = require('../utils/bcrypt')
const LocalStrategy = require('passport-local').Strategy
const users = require('../dao/models/users.model')
const { secret } = require('./config')

const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['cookieToken']
  }
  return token
}

const initializePassport = () => {
  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: secret
  }, async (jwt_payload, done) => {
    try {
      return done(null, jwt_payload)
    } catch (err) {
      return done(null, err)
    }
  }
  ));

  passport.use(
    'register',
    new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      try {
        let userData = req.body;
        let user = await users.findOne({ email: username });
        if (user) {
          console.log('Ya existe un usuario registrado con ese mail.');
          done(null, false);
        } else {
          let userNew = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
            age: userData.age,
            password: createHash(userData.password),
          };
          let result = await users.create(userNew);
          done(null, result);
        }
      } catch (err) {
        return done('Error al crear usuario:' + err);
      }
    })
  );

  passport.use('auth-github', new GitHubStrategy({
    clientID: '391c456c5eaf3a757fb4',
    clientSecret: '1cccb00bfe707b71735db75cc3418ee690315369',
    callbackURL: "http://localhost:8080/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile)
      let user = await users.findOne({ email: profile._json.email })
      if (!user) {
        let newUser = {
          name: profile._json.name,
          email: profile._json.email ? profile._json.email : profile._json.name,
          phone: '',
          password: '123456'
        }
        let result = await users.create(newUser)
        done(null, result)
      } else {
        done(null, user)
      }
    } catch (err) {
      return done(err)
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await users.findById(id);
    done(null, user);
  });
}

module.exports = { cookieExtractor, initializePassport };