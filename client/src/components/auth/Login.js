import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
    const auth = useAuth();
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [err, setErr] = useState("");
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (email === "") {
            // setErr("Email Field empty");
            toast.error("Email Field empty");
        }

        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(email).toLowerCase())) {
            // setErr("Invalid EmailID");
            toast.error("Invalid EmailID");
        }
        axios({
            method: "post",
            url: "/api/auth/login",
            data: {
                email,
                password,
            },
        }).then((result) => {
            if (result.data.success) {
                auth.login(result.data.user, result.data.token);
                history.push("/");
            } else {
                toast.error(result.data.data);
                console.log("oopsie");
            }
        });
        console.log("in submit");
    };

    return (
        <div className='register'>
            <Toaster position='top-left' reverseOrder={false} />
            <div className='shade'></div>
            <div className='overlay'>
                <div className='container'>
                    <div className='left-container'>
                        <div
                            style={{
                                color: "#FEC737",
                                fontWeight: "bold",
                                fontSize: "3rem",
                            }}>
                            <b> ALUMNI</b>
                        </div>
                        <div
                            style={{
                                color: "white",
                                fontWeight: "normal",
                                fontSize: "3rem",
                            }}>
                            PORTAL
                        </div>
                        <hr></hr>
                        <div
                            style={{
                                color: "white",
                                fontWeight: "normal",
                                fontFamily: "Roboto",
                                fontSize: "1rem",
                            }}>
                            Welcome to Primus Almuni Portal
                        </div>
                        <div
                            style={{
                                color: "white",
                                fontWeight: "normal",
                            }}>
                            Let’s Connect!
                        </div>
                    </div>
                    <div className='right-container'>
                        <form onSubmit={handleFormSubmit}>
                            <h2>Login</h2>
                            <div>
                                <input
                                    placeholder='Enter email'
                                    type='text'
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }></input>
                            </div>
                            <div>
                                <input
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }></input>
                            </div>
                            {/* {err ? (
                                <div
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                        fontSize: "0.75rem",
                                    }}
                                >
                                    {err}
                                </div>
                            ) : null} */}

                            <div
                                style={{
                                    color: "blue",
                                    fontSize: "0.75rem",
                                }}>
                                <a
                                    href='/forgotpassword'
                                    style={{ color: "grey" }}>
                                    Forgot Password
                                </a>
                            </div>
                            <button type='submit'>Login</button>
                        </form>
                        <span style={{ color: "grey" }}>New user?</span>
                        <span>
                            <a
                                href='/register'
                                style={{
                                    color: "#fec737",
                                    fontWeight: "bold",
                                }}>
                                Sign up
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
