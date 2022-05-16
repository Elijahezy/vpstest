const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const chatRouter = require('./routes/chatRouter');
const chatController = require('./controllers/chatController');

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));

const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();

const PORT = process.env.PORT || 5000;

app.use('/', authRouter);
app.use('/', chatRouter);

mongoose.connect(
  'mongodb+srv://elijah:ARTEEZYfun1@mycluster.lqs7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
).then;

app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    chatController.onMessage(ws, msg);
    broadcastConnection(ws, msg);
  });
});

app.listen(PORT);

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    client.send(msg);
  });
};
