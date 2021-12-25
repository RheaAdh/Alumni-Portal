import React from "react";

const UserCard = ({ user }) => {
  return (
    <div class="user">
      <div class="user-name">{user.username}</div>
      <div class="user-name">{user.college}</div>
      <div class="user-name">{user.fullName}</div>
      <div class="user-name">{user.email}</div>
      <div className="fas fa-envelope"></div>
    </div>
  );
};

export default UserCard;
