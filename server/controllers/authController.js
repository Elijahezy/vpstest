const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validationResult = require('express-validator').validationResult;

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '7d',
  });
};

exports.login = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: `Пользователь ${username} не найден` });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }
    const token = generateAccessToken(user._id, user.roles);
    return res.json({ token, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Login error' });
  }
};

exports.registration = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const candidate = await User.findOne({ username });
    if (candidate) {
      res.status(400).json({ message: 'Такой пользователь уже есть' });
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: 'USER' });
    const user = new User({
      username,
      password: hashedPassword,
      roles: [userRole.value],
    });

    await user.save();
    const userFromServer = await User.findOne({ username });
    const token = generateAccessToken(userFromServer._id, userFromServer.roles);
    return res.json({ token });
  } catch (error) {
    res.send({ error: 'Registration error' });
    console.log(error);
  }
};

exports.checkUser = async function (req, res) {
  const token = req.body.token;
  if (!token) {
    return res.send({ isAuth: false });
  }
  try {
    const { id, roles } = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.send({ isAuth: false });
    }
    return res.send({ isAuth: true, username: user.username, roles });
  } catch (error) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
};
