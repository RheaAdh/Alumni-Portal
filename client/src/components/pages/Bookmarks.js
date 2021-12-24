import React from "react";
import Nav from "../Nav";
import PageType from "../PageType";
import AdminPosts from "../admin/AdminPosts";
import { useAuth } from "../../context/AuthContext";

const Bookmarks = () => {
    const auth = useAuth();
    return (
        <div className="feed">
            <div className="left-feed">
                <Nav />
            </div>
            <div className="middle-feed">
                <div className="stick">Saved Posts</div>
                <PageType pageType={"getbookmarks"} />
            </div>
            <div className="right-feed">
                <AdminPosts />
            </div>
        </div>
    );
};

export default Bookmarks;
