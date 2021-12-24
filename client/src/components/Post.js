import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Comments from "./Comments";
import { TOKEN_ID } from "../utils/constants";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useParams, useHistory } from "react-router-dom";
import MyPhoto from "../images/me.jpg";
import { minsAgo } from "../utils/utilities";

const Post = ({
  imageLink,
  question,
  email,
  post_id,
  deletePost,
  editPostBookmark,
  bookmarkedArray,
  likedArray,
  editPostLike,
  owner,
  createdAt,
  currentDate,
  postedAgo,
}) => {
  const history = useHistory();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [like, setLike] = useState(false);
  useEffect(() => {
    //from bookmarked array we need to check if auth.state.email is present if not then bookmark =false else true
    let flag = 0;
    var arr = bookmarkedArray;
    let len = arr ? arr.length : 0;
    for (let i = 0; i < len; i++) {
      if (auth.user.email === bookmarkedArray[i]) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      setBookmark(false);
    } else {
      setBookmark(true);
    }
  }, []);

  useEffect(() => {
    //from liked array we need to check if auth.state.email is present if not then bookmark =false else true
    let flag = 0;
    var arr = likedArray;
    let len = arr ? arr.length : 0;
    for (let i = 0; i < len; i++) {
      if (auth.user.email === likedArray[i]) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      setLike(false);
    } else {
      setLike(true);
    }
  }, []);

  //toggles bookmark state
  const editBookmark = () => {
    console.log("inside edit");
    axios({
      method: "post",
      url: "/api/home/editbookmark",
      data: {
        postid: post_id,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.status) {
          setBookmark(true);
          console.log(result.data.data);
          editPostBookmark(result.data.data);
        } else {
          setBookmark(false);
          console.log(result.data.data);
          editPostBookmark(result.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  //toggles like state
  const editLike = () => {
    console.log("inside edit");
    axios({
      method: "post",
      url: "/api/home/editlike",
      data: {
        postid: post_id,
      },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.status) {
          setLike(true);
          console.log(result.data.data);
          editPostLike(result.data.data);
        } else {
          setLike(false);
          console.log(result.data.data);
          editPostLike(result.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    axios({
      method: "delete",
      url: "/api/home/deletepost",
      data: { postid: post_id },
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
      },
    }).then((result) => {
      console.log(result.data);
      if (result.data.success) {
        console.log("deleted");
        deletePost(post_id);
      } else {
        console.log("cannot del post");
      }
    });
  };

  return (
    <div class="post">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div class="modal">
          <div className="modal-left">
            <div className="modal-header">
              <div className="creator-img">
                {/* {console.log(owner.profileImage)}
                {owner.profileImage !== "" ? (
                  <img src={owner.profileImage} />
                ) : (
                  <img src={MyPhoto} />
                )} */}
              </div>
              <div className="creator-name">{owner.username}</div>
            </div>
            <div className="post-container">
              {/* show only when imageLink is present */}
              {imageLink && <img src={imageLink} className="post-image"></img>}

              {/* Caption */}
              <div className="question">{question}</div>
            </div>
          </div>
          <div className="modal-right">
            <Comments
              post_id={post_id}
              email={email}
              owner={owner} //of post
            />
          </div>
        </div>
      </Modal>
      {/* <div className="post-me">
        {owner.profileImage !== "" ? (
          <a href={`/profile/${owner.username}`}>
            <img src={owner.profileImage} />
          </a>
        ) : (
          <a href={`/profile/${owner.username}`}>
            <img src={MyPhoto} />
          </a>
        )}
      </div> */}

      <div class="post-body ">
        <h6>
          <a href={`/profile/${owner.username}`}>{owner.username}</a> .{" "}
          {postedAgo ? postedAgo : "Just Now"}
        </h6>
        <div className="question">{question}</div>

        {imageLink ? (
          <img src={imageLink} alt="bg-img" className="post-img" />
        ) : null}

        <span className="bottom-bar">
          {like ? (
            <span>
              <span
                style={{
                  textDecoration: "none",
                  border: "0",
                  backgroundColor: "#dbe0ee",
                  margin: "1rem",
                  color: "red",
                }}
                class="fas fa-heart "
                onClick={editLike}
              ></span>
              <span>{likedArray.length}</span>
            </span>
          ) : (
            <span>
              <span
                style={{
                  textDecoration: "none",
                  border: "0",
                  backgroundColor: "#dbe0ee",
                  className: "heart",
                  margin: "1rem",
                }}
                onClick={editLike}
                class="far fa-heart "
              ></span>
              <span>{likedArray.length}</span>
            </span>
          )}
          {bookmark ? (
            <span
              style={{
                textDecoration: "none",
                border: "0",
                backgroundColor: "#dbe0ee",
                margin: "1rem",
                color: "grey",
              }}
              class="fas fa-bookmark"
              onClick={editBookmark}
            ></span>
          ) : (
            <div
              style={{
                textDecoration: "none",
                border: "0",
                backgroundColor: "#dbe0ee",
                margin: "1rem",
              }}
              class="far fa-bookmark "
              onClick={editBookmark}
            ></div>
          )}
          {open ? (
            <div
              onClick={() => {
                setOpen(true);
                history.push(`/post/${post_id}`);
              }}
              style={{
                textDecoration: "none",
                border: "0",
                backgroundColor: "#F8F9FA",
                margin: "1rem",
                color: "grey",
              }}
              class="fas fa-comment "
            ></div>
          ) : (
            <div
              onClick={() => {
                setOpen(true);
              }}
              style={{
                textDecoration: "none",
                border: "0",
                backgroundColor: "#dbe0ee",
                margin: "1rem",
              }}
              class="far fa-comment "
            ></div>
          )}

          {auth.user ? (
            !auth.user.isAdmin ? (
              auth.user.email == email ? (
                <div
                  onClick={handleDelete}
                  style={{
                    textDecoration: "none",
                    border: "0",
                    backgroundColor: "#dbe0ee",
                    margin: "1rem",
                    color: "grey",
                  }}
                  class="fas fa-trash "
                ></div>
              ) : null
            ) : (
              <div
                onClick={handleDelete}
                style={{
                  textDecoration: "none",
                  border: "0",
                  backgroundColor: "#dbe0ee",
                  margin: "1rem",
                  color: "grey",
                }}
                class="fas fa-trash "
              ></div>
            )
          ) : (
            "user not updated"
          )}
        </span>
      </div>
    </div>
  );
};

export default Post;
