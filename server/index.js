const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const messages = [];

const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    console.log(msg);
    console.log(messages, 'первая проверка');
    messages.push(msg);
    console.log(messages, 'вторая проверка');
    broadcastConnection(ws, msg, messages);
    ws.send(JSON.stringify(messages));
  });
  ws.send(JSON.stringify(messages));
});

app.listen(PORT);

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    client.send(JSON.stringify(messages));
  });
};
