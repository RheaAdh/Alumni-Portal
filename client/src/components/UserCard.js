import React from "react";
import MyPhoto from "../images/me.jpg";

const UserCard = ({ user }) => {
    return (
        <div class="user">
            <div class="userimage">
                <img src={MyPhoto} className="img-user" />
            </div>
            <div class="user-name">{user.username}</div>
            <div class="user-name">{user.college}</div>
            <div class="user-name">{user.fullName}</div>
            <div class="user-name">{user.email}</div>
            <div className="fas fa-envelope"></div>
        </div>
    );
};

export default UserCard;
