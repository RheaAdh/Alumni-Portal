import React, { useState } from "react";

import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const ResetPassword = () => {
    const [err, setErr] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const history = useHistory();
    const { token } = useParams();

    const handleSubmit = (e) => {
        //send email in body and return err or send mail if successfull call
        e.preventDefault();
        console.log("tokennnn:");
        console.log(token);
        if (pass == "") {
            setErr("Please Enter your Password");
            return;
        }
        if (pass.length < 8) {
            setErr("Weak Password,try again");
            return;
        }
        if (pass === confirmPass) {
            axios({
                method: "post",
                url: `/api/auth/resetpassword/${token}`,
                data: {
                    password: pass,
                    token: token,
                },
            })
                .then((result) => {
                    console.log(result.data);
                    if (result.data.success) {
                        console.log(result);
                      
                        history.push("/login");
                    } else {
                        setErr(result.data.data);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setErr("Conform Password and password do not match");
        }
    };
 
    return (
        <div className="register">
            <div className="shade"></div>
            <div className="overlay">
                {/* <img src={Logo}></img> */}

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
                                fontFamily: "Roboto",
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
                                fontFamily: "Roboto",
                                fontSize: "1rem",
                            }}
                        >
                            Welcome to Primus Almuni Portal
                        </div>
                        <div
                            style={{
                                color: "white",
                                fontWeight: "normal",
                                fontFamily: "Roboto",
                            }}
                        >
                            Let’s Connect!
                        </div>
                    </div>
                    <div className="right-container">
                        <form
                            onSubmit={handleSubmit}
                            className="form-container"
                        >
                            <h2>Reset Password</h2>
                            <div className="form-input">
                                <input
                                    placeholder="Enter new password"
                                    type="password"
                                    onChange={(e) => setPass(e.target.value)}
                                ></input>
                            </div>
                            <div className="form-input">
                                <input
                                    placeholder="Confirm password"
                                    type="password"
                                    onChange={(e) =>
                                        setConfirmPass(e.target.value)
                                    }
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
                            <button type="submit">Confirm New Password</button>
                            <span>
                                <a href="/forgotpassword">Forgot Password?</a>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
