const Msg = require('../models/Msg');

exports.onMessage = async function (ws, message) {
  const body = JSON.parse(message);
  try {
  } catch (error) {
    console.log(error);
  }
};
