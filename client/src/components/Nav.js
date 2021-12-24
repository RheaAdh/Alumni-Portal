import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
// import Logo from "../images/Logo.png";    Not Used yet
import { TOKEN_ID } from "../utils/constants";
const Nav = () => {
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const [username, setUsername] = useState("");
    let [user, setUser] = useState(null);

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
                console.log("....");
                console.log(result.data.data.username);
                setUsername(result.data.data.username);
                setUser(result.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='nav'>
            <div class={`nav-link ${location.pathname === "/" ? "active" : ""}`} onClick={() => history.push("/")}>
                <span className='fas fa-home'></span>
                <span className='nav-label'>Home</span>
            </div>

            <div class={`nav-link ${location.pathname === "/community" ? "active" : ""}`} onClick={() => history.push("/community")}>
                <span className='fas fa-user-friends'></span>
                <span className='nav-label'>Community</span>
            </div>

            <div class={`nav-link ${location.pathname === "/chat" ? "active" : ""}`} onClick={() => history.push("/chat")}>
                <span className='fas fa-envelope'></span>
                <span className='nav-label'>Chat</span>
            </div>

            <div class={`nav-link ${location.pathname === "/saved" ? "active" : ""}`} onClick={() => history.push("/saved")}>
                <span className='fas fa-bookmark'></span>
                <span className='nav-label'>Saved</span>
            </div>
            <div class={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} onClick={() => history.push("/profile")}>
                <span className='fas fa-user-circle'></span>
                <span className='nav-label'>Profile</span>
            </div>

            {user ? (
                user.isAdmin ? (
                    <div
                        class={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
                        onClick={() => history.push("/admin")}>
                        <span className='fas fa-lock'></span>
                        <span className='nav-label'>Admin</span>
                    </div>
                ) : null
            ) : null}

            <div className={`nav-link ${location.pathname === "/logout" ? "active" : ""}`} onClick={auth.logout}>
                <span className='fas fa-sign-out-alt'></span>
                <span className='nav-label'>Logout</span>
            </div>

            {/* <div className="nav-link">
                <a href="https://primusschool.edu.in/" target="_blank">
                    <img src={Logo} class="logo"></img>
                </a>
            </div> */}
        </div>
    );
};

export default Nav;
