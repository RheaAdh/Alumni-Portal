import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";
const Individual = ({ user, DeleteUser }) => {
    const [verified, setVerified] = useState(user.isVerifiedByAdmin);
    const auth = useAuth();

    const BlockUser = (userid) => {
        axios({
            method: "post",
            url: "/api/admin/blockuser",
            data: {
                userid: userid,
            },
            headers: {
                "Content-type": "application/json",
                'x-auth-token': `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                console.log(result.data)
                if (result.data.success) {
                    console.log("blocked")
                    console.log(result.data.data);
                    setVerified(false);
                } else {
                    console.log("cant");
                }
            })
            .catch((err) => console.log(err));
    };

    const VerifyUser = (userid) => {
        axios({
            method: "post",
            url: "/api/admin/verifyuser",
            data: {
                userid: userid,
            },
            headers: {
                "Content-type": "application/json",
                'x-auth-token': `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                if (result.data.success) {
                    console.log(result.data.data);
                    setVerified(true);
                } else {
                    console.log("cant");
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="verify1">
            <span className="name">{user.username}</span>
            {verified ? (
                <button className="btn2" onClick={() => BlockUser(user._id)}>
                    Block
                </button>
            ) : (
                <button className="btn1" onClick={() => VerifyUser(user._id)}>
                    Accept
                </button>
            )}
            <button className="btn1" onClick={() => DeleteUser(user._id)}>
                Delete
            </button>
        </div>
    );
};

export default Individual;
