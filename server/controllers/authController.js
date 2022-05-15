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
    expiresIn: '24h',
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
    return res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Login error' });
  }
};

exports.registration = async function (req, res) {
  console.log('server works registration');
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
    console.log(user);
    await user.save();
    return res.json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    res.status(400).json({ error: 'Registration error' });
  }
};

exports.getUser = async function (req, res) {
  res.send('server works get');
};
