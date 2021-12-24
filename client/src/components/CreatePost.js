import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import useForceUpdate from "../hooks/useForceUpdate";
import MyPhoto from "../images/me.jpg";
import { storeFile } from "../utils/utilities";
import { useAuth } from "../context/AuthContext";
import { TOKEN_ID } from "../utils/constants";

const CreatePost = ({
	isAdmin,
	addPost
}) => {
    const [question, setQuestion] = useState("");
    const auth = useAuth();
    const postFileRef = useRef(null);
    const update = useForceUpdate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("aaaaaaaaaaaaaddddddddd post");
        const imageLink = await handleSaveDocument(
            "posts",
            Date.now().toString(),
            postFileRef
        );
        let url;
        if (isAdmin) {
            url = "/api/home/addadminpost";
        } else {
            url = "/api/home/addpost";
        }
        axios({
            method: "post",
            url: url,
            data: {
                imageLink,
                question: question,
            },
            headers: {
                "Content-type": "application/json",
                "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
            },
        })
            .then((result) => {
                console.log(result);
                if (result.data.success) {
                    setLoading(false);
                    console.log(result.data);
                    console.log("resultttt")
                    console.log(result.data.data)
                    addPost(result.data.data);
                } else {
                    console.log("oops");
                }
            })
            .catch((err) => console.log(err));
        
        // window.location.reload();
        console.log("in handlesubmit");
    };

    const handleSaveDocument = async (folderName, fileName, ref) => {
        if (!ref || !ref.current) return;
        const file = ref.current.files[0];
        try {
            const url = await storeFile(folderName, fileName, file);
            return url.toString();
        } catch (err) {
            console.log("oops");
            return "";
        }
    };

    return (
        <div className="create-post">
            <div className="create-left">
                {auth.user.profileImage != "" ? (
                    <img src={auth.user.profileImage} />
                ) : (
                    <img src={MyPhoto} />
                )}
            </div>

            <form className="create-right">
                <textarea
                    rows="3"
                    cols="25"
                    placeholder="Post something..."
                    onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
                <input
                    ref={postFileRef}
                    onChange={update}
                    type="file"
                    name="file"
                    accept="file/*"
                />
                <button type="submit" onClick={handleSubmit}>
                    Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
