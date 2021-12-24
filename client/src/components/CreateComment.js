import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import MyPhoto from "../images/me.jpg";
import { TOKEN_ID } from "../utils/constants";
import Toast from "./Toast";

const CreateComment = ({ post_id, addComment }) => {
  const [comment, setComment] = useState("");
  const [showToast, setShowToast] = useState(false);

  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment !== "") {
      axios({
        method: "post",
        url: "/api/home/addcomment",
        data: {
          commenttext: comment,
          postid: post_id,
        },
        headers: {
          "Content-type": "application/json",
          "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
        },
      }).then((result) => {
        addComment(result.data.comment);
        setComment("");
      });
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div>
      {showToast === true && <Toast message="Comment cannot be empty..." />}

      <div className="create-comment">
        <div className="left-image">
          {auth.user.profileImage != "" ? (
            <img src={auth.user.profileImage} />
          ) : (
            <img src={MyPhoto} />
          )}
        </div>
        <div className="right-input">
          <form>
            <textarea
              placeholder="Comment something..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
            <button type="submit" onClick={handleSubmit}>
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
