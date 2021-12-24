import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Nav from "../Nav";
import axios from "axios";
import { TOKEN_ID } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";

import PageType from "../PageType";
import AdminPosts from "../admin/AdminPosts";
import MyPhoto from "../../images/me.jpg";

const OtherProfile = () => {
    const auth = useAuth();
    const history = useHistory();
    const { username } = useParams();
    const [otherUser, setOtherUser] = useState({});

    useEffect(() => {
        console.log("inside useeffect of other profile");
        axios({
            method: "get",
            url: `/api/users/profile/${username}`,
            headers: {
                "Content-type": "application/json",
                "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                console.log(result.data);
                if (result.data.success) setOtherUser(result.data.data);
                else {
                    console.log("ohhono");
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="feed">
            <div className="left-feed">
                <Nav />
            </div>
            <div className="middle-feed">
                <div className="profile">
                    <div className="profile-top">
                        <div className="profile-left">
                            {otherUser.profileImage != "" ? (
                                <img
                                    src={otherUser.profileImage}
                                    className="img-user"
                                />
                            ) : (
                                <img src={MyPhoto} className="img-user" />
                            )}
                        </div>
                        <div className="profile-right">
                            <h1>{otherUser.username}</h1>
                            {otherUser.college ? (
                                <h3>College: {otherUser.college}</h3>
                            ) : null}
                            {otherUser.yearsOfExp ? (
                                <h3>
                                    Years of Experience:{otherUser.yearsOfExp}
                                </h3>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        margin: "1rem",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                    className="profile-down"
                >
                    <h2>{otherUser.fullName}'s Posts</h2>
                    {console.log("++++", otherUser._id)}
                    <PageType pageType={""} userid={otherUser._id} />
                </div>
            </div>

            <div className="right-feed">
                <AdminPosts />
            </div>
        </div>
    );
};

export default OtherProfile;
