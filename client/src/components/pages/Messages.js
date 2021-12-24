import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TOKEN_ID } from "../../utils/constants";
import Nav from "../Nav";
import AdminPosts from "../admin/AdminPosts";
import Conversation from "../Conversation";

import { useAuth } from "../../context/AuthContext";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:8900");

const Messages = () => {
    //all prev conversations shld be displayed by default
    const [conversations, setConversations] = useState([]);

    //need to find query from all users
    const [users, setUsers] = useState([]);

    // sender
    const [user, setUser] = useState({});
    // receiver
    const [currentUser, setCurrentUser] = useState({});

    const [filterUsers, setFilterUsers] = useState([]);

    const auth = useAuth();

    const [message, setMessage] = useState("");
    const [conversationid, setConversationid] = useState("");

    // get user
    useEffect(() => {
        axios({
            method: "get",
            url: "/api/auth/getuser",
            headers: {
                "Content-type": "application/json",
                "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                // console.log("getuserrr");
                // console.log(result.data.data);
                setUser(result.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    //Get all users and search from this
    useEffect(() => {
        axios({
            method: "get",
            url: "/api/users/getall",
            headers: {
                "Content-type": "application/json",
                "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                // console.log("getalluserss");
                // console.log(result.data.data);
                setUsers(result.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // getting all conversations that will display by default
    useEffect(() => {
        axios({
            method: "get",
            url: "/api/convo/getconvo",
            headers: {
                "Content-type": "application/json",
                "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                if (result.data.success) {
                    // console.log("conversations :");
                    // console.log(result.data.data);
                    // console.log("filter users");
                    // console.log(filterUsers);
                    setConversations(result.data.data);
                } else {
                    console.log(result.data.data);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleMessageSubmit = (e) => {};
    const searchUserFunc = (e) => {
        //i need to find all those users who have a name with the query in it
        //every time on change empty th vector
        let arr = [];
        for (let i = 0; i < users.length; i++) {
            let username = users[i].username.toLowerCase();
            if (e.target.value != "" && username.search(e.target.value) > -1) {
                // console.log(username);
                arr.push(users[i]);
            }
        }
        if (e.target.value !== "") {
            // console.log("arr:");
            // console.log(arr);
            // console.log("filtered:");
            setFilterUsers(arr);
            // console.log(filterUsers);
        } else {
            setFilterUsers([]);
        }
    };

    return (
        <div className="chat">
            <div className="left-nav">
                <Nav />
            </div>

            <div className="right-side">
                <div className="left-column">
                    <input
                        type="text"
                        placeholder="Search Name"
                        onChange={searchUserFunc}
                    ></input>

                    {filterUsers.length !== 0
                        ? filterUsers.map((x) => (
                              <button
                                  onClick={() => {
                                      setCurrentUser(x);
                                      //addconvo only if no convo
                                      axios({
                                          method: "post",
                                          url: "/api/convo/postconvo",
                                          data: {
                                              senderid: user._id,
                                              receiverid: x._id,
                                          },
                                          headers: {
                                              "Content-type":
                                                  "application/json",
                                              "x-auth-token": `${localStorage.getItem(
                                                  TOKEN_ID
                                              )}`,
                                          },
                                      })
                                          .then((result) => {
                                              if (result.data.success) {
                                                  if (result.data.status == 1)
                                                      setConversations([
                                                          ...conversations,
                                                          result.data.data,
                                                      ]);

                                                  setConversationid(
                                                      result.data.data._id
                                                  );
                                              }
                                          })
                                          .catch((err) => console.log(err));
                                  }}
                              >
                                  {x.username}
                              </button>
                          ))
                        : conversations.map((x) => (
                              <button
                                  onClick={() => {
                                      setCurrentUser(x.receiver);
                                      axios({
                                          method: "post",
                                          url: "/api/convo/postconvo",
                                          data: {
                                              senderid: user._id,
                                              receiverid: x.receiver._id,
                                          },
                                          headers: {
                                              "Content-type":
                                                  "application/json",
                                              "x-auth-token": `${localStorage.getItem(
                                                  TOKEN_ID
                                              )}`,
                                          },
                                      })
                                          .then((result) => {
                                              //   console.log(
                                              //       "serrrrrrrrrrrrrrrrrrrrrrrtttttt"
                                              //   );
                                              //   console.log(result.data);
                                              if (result.data.success) {
                                                  if (result.data.status == 1)
                                                      setConversations([
                                                          ...conversations,
                                                          result.data.data,
                                                      ]);

                                                  setConversationid(
                                                      result.data.data._id
                                                  );
                                              }
                                          })
                                          .catch((err) => console.log(err));
                                  }}
                              >
                                  {x.receiver.username}
                              </button>
                          ))}
                </div>

                <form className="right-column">
                    <div className="curr-user-selected">
                        {currentUser.username}
                    </div>

                    <div className="chat-box">
                        <Conversation
                            convoid={conversationid}
                            user={user}
                            currentUser={currentUser}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Messages;
