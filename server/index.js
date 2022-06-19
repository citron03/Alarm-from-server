const express = require('express');
const sockjs = require('sockjs');
const http = require('http');

var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

var sockjs_echo = sockjs.createServer(sockjs_opts);

sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
});

var app = express();
var server = http.createServer(app);
const port = 8080

sockjs_echo.installHandlers(server, {prefix:'/echo'});

server.listen(port, () => {
  console.log(`${port}번 포트에서 서버가 동작중입니다.`)
})

app.get('/', (req, res) => {
    res.send('알림을 위한 서버 앱이 지금 작동중입니다.')
})