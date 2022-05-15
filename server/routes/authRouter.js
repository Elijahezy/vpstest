var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),

    check('password', 'Пароль не может быть меньше 6 символов').isLength({
      min: 6,
      max: 20,
    }),
  ],
  authController.registration
);

router.post('/login', authController.login);

router.get('/users', authController.getUser);

module.exports = router;
