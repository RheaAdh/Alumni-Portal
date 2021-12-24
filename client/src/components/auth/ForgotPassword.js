import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [err, setErr] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: "/api/auth/forgotpassword",
            data: {
                email: email,
            },
        })
            .then((result) => {
                console.log(result.data);
                if (result.data.success) {
                    setErr("Check your inbox");
                } else {
                    setErr(result.data.data);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="register">
            <div className="shade"></div>
            <div className="overlay">
                <div className="container">
                    <div className="left-container">
                        <div
                            style={{
                                color: "#FEC737",
                                fontWeight: "bold",
                                fontSize: "3rem",
                            }}
                        >
                            <b> ALUMNI</b>
                        </div>
                        <div
                            style={{
                                color: "white",
                                fontWeight: "normal",

                                fontSize: "3rem",
                            }}
                        >
                            PORTAL
                        </div>
                        <hr></hr>
                        <div
                            style={{
                                color: "white",
                                fontWeight: "normal",

                                fontSize: "1rem",
                            }}
                        >
                            Welcome to Primus Almuni Portal
                        </div>
                        <div
                            style={{
                                color: "white",
                                fontWeight: "normal",
                            }}
                        >
                            Let’s Connect!
                        </div>
                    </div>
                    <div className="right-container">
                        <form onSubmit={handleSubmit}>
                            <h2>Forgot Password</h2>
                            <div>
                                <input
                                    placeholder="Enter email"
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>

                            {err ? (
                                <div
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                        fontSize: "0.75rem",
                                    }}
                                >
                                    {err}
                                </div>
                            ) : null}

                            <button type="submit">Send Email</button>
                        </form>
                        <span style={{ color: "grey" }}>Not registered?</span>
                        <span>
                            <a
                                href="/register"
                                style={{ color: "#fec737", fontWeight: "bold" }}
                            >
                                Sign up
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
