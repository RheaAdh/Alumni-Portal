import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Individual from "./Individual";
import { TOKEN_ID } from "../utils/constants";
import Input from "./Input";

const VerifyUsers = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [filterusers, setFilterUsers] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    axios({
      method: "get",
      url: "/api/users/getall",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          console.log("get all users");
          console.log(result.data.data);
          setUsers(result.data.data);
        } else {
          console.log("cannot get all users");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let arrusers = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].username.toLowerCase().includes(searchItem.toLowerCase())) {
        arrusers.push(users[i]);
        console.log(users[i]);
      }
      console.log(searchItem);
    }
    setFilterUsers(arrusers);
  }, [searchItem]);

  const DeleteUser = (userid) => {
    axios({
      method: "post",
      url: "/api/admin/deleteuser",
      data: {
        userid: userid,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          GetAll();
        } else {
          console.log("cant");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Input
        inputValue={"Search User"}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <div className="bottom">
        {searchItem == ""
          ? users.map((user) => (
              <Individual user={user} DeleteUser={DeleteUser} />
            ))
          : filterusers.map((user) => <Individual DeleteUser={DeleteUser} />)}
      </div>
    </div>
  );
};

export default VerifyUsers;
