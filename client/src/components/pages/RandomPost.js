import React from "react";
import PageType from "../PageType";
import Nav from "../Nav";
import AdminPosts from "../admin/AdminPosts";
import MyPhoto from "../../images/me.jpg";
import { useParams } from "react-router-dom";

const RandomPost = () => {
    const { postid } = useParams();
    return (
        <div className="feed">
            <div className="left-feed">
                <Nav />
            </div>
            <div className="middle-feed">
                <h1>Random post: {postid}</h1>
                <PageType pageType={`getpost/${postid}`} />
                <PageType userid={postid.owner} />
            </div>

            <div className="right-feed">
                <AdminPosts />
            </div>
        </div>
    );
};

export default RandomPost;
