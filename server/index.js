const express = require('express');
const sockjs = require('sockjs');
const http = require('http');

const sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

const sockjs_echo = sockjs.createServer(sockjs_opts);

sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
      console.log(message, ": 클라이언트에서 온 메세지"); // 클라이언트에서 온 메세지
      conn.write(`서버가 메세지 ~ ${message} ~ 받았어`); // 클라이언트로 메세지 보내기
    });
});

// let i = 5000;

// sockjs_echo.once("connection", (conn) => {
//   setInterval(() => {
//     conn.write(`서버 시작 ${i / 1000}초 경과`);
//     i += 5000;
//   }, 5000);
// })

const app = express();
const server = http.createServer(app);
const port = 8080

sockjs_echo.installHandlers(server, {prefix:'/echo'});

server.listen(port, () => {
  console.log(`${port}번 포트에서 서버가 동작중입니다.`)
})

app.get('/', (req, res) => {
  res.send('알림을 위한 서버 앱이 지금 작동중입니다.');
})

let check = true;

app.get('/alarm', (req, res) => {
  console.log(check);
  sockjs_echo.once('connection', function(conn) {
    if(check) {
      conn.write(`서버에서 알람이 도착!`);
      check = false;
    }
  });
  res.send('알람 전송');
})