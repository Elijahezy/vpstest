const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const chatController = require('./controllers/chatController');

const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', authRouter);

app.options(
  '*',
  cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 })
);

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

mongoose.connect(
  'mongodb+srv://elijah:ARTEEZYfun1@mycluster.lqs7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
).then;

app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    // broadcastConnection(ws, msg, messages);
    // ws.send(JSON.stringify(messages));
    chatController.onMessage(ws, msg);
  });
  // ws.send(JSON.stringify(messages));
});

app.listen(PORT);

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    // client.send(JSON.stringify(messages));
  });
};
