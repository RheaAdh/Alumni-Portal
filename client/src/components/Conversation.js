import React, { useEffect, useContext, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";

const Conversation = ({ convoid, user, currentUser }) => {
    const scrollRef = useRef();

    //user-> sender
    //currUser ->receiver
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const auth = useAuth();
    const socket = useRef(io("ws://localhost:8900"));

    useEffect(() => {
        console.log("userid" + user._id);
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            console.log(users);
        });
    }, [user]);

    useEffect(() => {
        axios({
            method: "get",
            url: `/api/convo/getmsgs/${convoid}`,
            headers: {
                "Content-type": "application/json",
                "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                console.log("get msgsgsgsgsgsg");
                console.log(result.data);
                if (result.data.success) {
                    setMessages(result.data.data);
                }
            })
            .catch((err) => console.log(err));
    }, [convoid]);
    const handleMessageSubmit = (e) => {
        //addmsg
        //updatemsgs
        console.log("useeff" + message);
        e.preventDefault();
        axios({
            method: "post",
            url: "/api/convo/addmsg",
            data: {
                conversationid: convoid,
                senderid: user._id,
                text: message,
            },
            headers: {
                "Content-type": "application/json",
                "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                console.log("post message ok ok ok");
                if (result.data.success) {
                    console.log(result.data.data);
                    setMessages([...messages, result.data.data]);
                    setMessage("");
                }
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);
    return (
        <div>
            <h1>{convoid}</h1>
            <div className='chat-message' ref={scrollRef}>
                {messages.length !== 0 ? (
                    messages.map((x) => <div>{x.text}</div>)
                ) : (
                    <div>No messages so far start chatting!</div>
                )}
            </div>
            <form>
                <input
                    type='text'
                    name='chat'
                    placeholder='Send text'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}></input>
                <button type='submit' onClick={handleMessageSubmit}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Conversation;
