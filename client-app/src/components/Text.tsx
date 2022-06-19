import React, { useState } from "react";
import SockJs from "sockjs-client";

interface TextProps {}

const Text: React.FC<TextProps> = () => {

    const [messages, setMessages] = useState<string[]>([]);

    const sockjs_url = 'http://localhost:8080/echo';
    const sockjs = new SockJs(sockjs_url);

    sockjs.onopen = function () {
        console.log('소켓 open', sockjs.protocol);
    };
    sockjs.onmessage = function (e) {
        console.log('소켓 message : ', e.data);
    };
    sockjs.onclose = function () {
        console.log('소켓 close');
    };

    return (
        <div>
            <p>받은 알림 목록입니다.</p>
            {messages.map(el => <h3>{el}</h3>)}
        </div>
    );
}

export default Text;