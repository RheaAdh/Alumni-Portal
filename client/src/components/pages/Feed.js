import React from "react";
import Nav from "../Nav";
import PageType from "../PageType";
import AdminPosts from "../admin/AdminPosts";

const Feed = () => {
    return (
        <div className="feed">
            <div className="left-feed">
                <Nav />
            </div>

            <div className="middle-feed">
                <div className="stick">Feed</div>
                <PageType pageType={"getposts"} />
            </div>
            <div className="right-feed">
                <AdminPosts />
            </div>
        </div>
    );
};

export default Feed;
