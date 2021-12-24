import React from "react";
import PageType from "../PageType";
const AdminPosts = () => {
    return (
        <div className="admin">
            <div className="sticky">Admin Posts</div>
            <PageType pageType={"getadminposts"} />
        </div>
    );
};
export default AdminPosts;
