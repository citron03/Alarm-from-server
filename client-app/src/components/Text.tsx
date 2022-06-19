import React, { useEffect, useState } from "react";
import SockJs from "sockjs-client";

interface TextProps {}

const Text: React.FC<TextProps> = () => {

    const [messages, setMessages] = useState<string[]>([]);
    const [sendText, setSendText] = useState<string>("");

    const sockjs_url = 'http://localhost:8080/echo';
    const sockjs = new SockJs(sockjs_url);


    useEffect(() => {
        sockjs.onopen = function () {
            console.log('소켓 open', sockjs.protocol);
        };
    }, []);
    sockjs.onmessage = (e) => {
        console.log('소켓 message : ', e.data);
        setMessages(prev => [...prev, e.data]);
    };
    useEffect(() => {
        console.log(messages);
        sockjs.onmessage = (e) => {
            console.log('리렌더링');
            setMessages(prev => [...prev, e.data]);
        };
    });
    sockjs.onclose = function () {
        console.log('소켓 close');
    };


    return (
        <div>
            <p>받은 알림 목록입니다.</p>
            <input placeholder="메세지 전달" onChange={(e) => setSendText(e.target.value)}/>
            <button type="submit" onClick={() => sockjs.send(sendText)}>GO!</button>
            {messages.map((el, idx) => <h3 key={idx}>{el}</h3>)}
        </div>
    );
}

export default Text;