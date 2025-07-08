import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "@radix-ui/themes";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import UserImage from "../assets/user.png";
import RobotImage from "../assets/robot.png";
import SendImage from "../assets/send.png";
import "../styles/styles.css";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi", time: new Date() },
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input, time: new Date() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        setTimeout(() => {
            const botMessage = { sender: "bot", text: "Hi!", time: new Date() };
            setMessages((prev) => [...prev, botMessage]);
        }, 500);
    };

    useEffect(() => {
        const viewport = scrollRef.current;
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-container">
            <Card className="chat-box">
                <ScrollArea.Root className="scroll-area">
                    <ScrollArea.Viewport className="scroll-viewport" ref={scrollRef}>
                        <div className="message-box">
                            {messages.map((msg, index) => {
                                const avatar = msg.sender === "user" ? UserImage : RobotImage;
                                const messageClass =
                                    msg.sender === "user" ? "user-message" : "bot-message";
                                const avatarClass =
                                    msg.sender === "user" ? "avatar-user" : "avatar-chatbot";
                                const containerClass =
                                    msg.sender === "user"
                                        ? "message-container user-container"
                                        : "message-container bot-container";

                                return (
                                    <div key={index} className={containerClass}>
                                        <img
                                            src={avatar}
                                            alt={msg.sender}
                                            className={`avatar ${avatarClass}`}
                                        />
                                        <div className={`message ${messageClass}`}>
                                            <div>{msg.text}</div>
                                            <div>
                                                {msg.time.toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical" />
                    <ScrollArea.Corner />
                </ScrollArea.Root>

                <div className="input-container">
                    <input
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Ask anything"
                    />
                    <Button onClick={sendMessage} className="send-button">
                        <img src={SendImage} alt="Send" className="send-image" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}
