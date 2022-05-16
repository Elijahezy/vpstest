const Msg = require('../models/Msg');

exports.onMessage = async function (ws, message) {
  const body = JSON.parse(message);
  try {
    const msg = await Msg.create({
      message: body.message,
      username: body.username,
    });
    msg.save();
  } catch (error) {
    console.log(error);
  }
};

exports.getPaginationMessages = async function (req, res) {
  try {
    const { page, limit } = req.query;
    const messages = await Msg.find({}).limit(Number(limit));
    return res.json(messages);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Ошибка получения сообщений' });
  }
};

exports.getMessagesLength = async function (req, res) {
  try {
    const messagesLength = await Msg.countDocuments({});
    return res.json({ messagesLength });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Ошибка получения длины сообщений' });
  }
};
