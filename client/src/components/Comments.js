import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import MyPhoto from "../images/me.jpg";
import CreateComment from "./CreateComment";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";
import Loading from "./Loading";

const Comments = ({ post_id, owner }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const addComment = (x) => {
    setComments([...comments, x]);
  };

  useEffect(() => {
    setLoading(true);
    axios({
      method: "post",
      url: "/api/home/getcomments",
      data: {
        postid: post_id,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        if (result.data.success) {
          setComments(...comments, result.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <CreateComment post_id={post_id} addComment={addComment} />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {comments.length === 0 ? (
            <h5>No comments to show...</h5>
          ) : (
            <div>
              {comments.map((comment) => (
                <div className="comment">
                  <div className="comment-left">
                    {comment.owner.profileImage !== "" ? (
                      <img
                        src={comment.owner.profileImage}
                        className="img-user"
                      />
                    ) : (
                      <img src={MyPhoto} className="img-user" />
                    )}
                  </div>

                  <div className="comment-right">
                    <b>
                      <a href={`/profile/${comment.owner.username}`}>
                        {comment.owner.username}
                      </a>
                    </b>
                    <div>{comment.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
