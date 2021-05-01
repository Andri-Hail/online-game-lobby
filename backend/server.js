const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const passport = require('passport');
const User = require('./models/user')

const cookieSession = require('cookie-session')
const path = require('path')
require('./passport-setup')
const AccountRouter = require('./routes/account')
const LobbyRouter = require('./routes/api')

const app = express()

const MONGO_URI = 'mongodb://localhost:27017/game-lobby'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
app.use(express.static('dist'))


app.use(
  cookieSession({
    name: 'session',
    keys: ['notRandom'],
    maxAge: 20000000,
  }),
)
app.use(express.json())

app.use(passport.initialize());
app.use(passport.session());


app.get('/good', (req, res) =>{
  const  displayName  = req.user.displayName

  console.log(displayName)
  try {
    User.findOne({ username: displayName }, (err2, user) => {
      if (user) {
        req.session.username = displayName
      } else {
        User.create({ username:displayName, password: '12j9-qwdnasip-j2'})
        req.session.username = displayName

      }
      res.redirect('/')

    })
  } catch {
    res.send("Couldn't sign you up")
  }

  
  // console.log(req.user.displayName)
  // res.send(req.user.displayName)
  // res.render("pages/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})


// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/account', AccountRouter)
app.use('/api', LobbyRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})
app.listen(3000, () => {
  console.log('listening on 3000')
})
