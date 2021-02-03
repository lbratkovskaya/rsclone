const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../user');

const getUser = async (username) => {
  const user = await User.findOne({ username }, (err, doc) => {
    if (err) {
      throw err;
    }

    return doc;
  });

  return user;
}

const registerController = async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  if (user) {
    res.send(`User ${username} already exists`);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save((err) => {
      if (err) {
        throw err;
      }

      req.logIn(newUser, (err) => {
        if (err) {
          throw err;
        }

        res.send(newUser);
      });

    });    
  }
}

const loginController = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      res.send('Wrong data. Change username or password');
    } else {
      req.logIn(user, (err) => {
        if (err) {
          throw err;
        }

        res.send('Authentication succeed');
      })
    }
  })(req, res, next);
};

const currentUserController = async (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  const user = await getUser(username);
  res.send(user);
};

const saveFavorites = (req, res) => {
  const { id, username, favorites } = req.body;

  User.findOneAndUpdate(
    { _id: id }, 
    { $set: { favorites }}, 
    async (err, doc) => {
      if (err) {
        throw err;
      }

      if (doc) {
        console.log(`Favorites of ${username} were successfully updated`);
        res.sendStatus(200);
      }
  });
};

module.exports = {
  registerController,
  loginController,
  currentUserController,
  saveFavorites
};