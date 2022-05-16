var express = require('express');
var router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/msgs/some', chatController.getPaginationMessages);

router.get('/msgs/length', chatController.getMessagesLength);

module.exports = router;
