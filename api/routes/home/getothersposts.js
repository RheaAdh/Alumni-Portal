const Post = require("../.././models/Post");

module.exports = async (req, res) => {
    console.log(req.params.userid);
    console.log("getothersposts");
    try {
        const posts = await Post.find({
            isAdmin: false,
        })
            .populate("owner")
            .sort({ _id: -1 });
        // console.log(posts);
        const userposts = [];
        for (let i = 0; i < posts.length; i++) {
            console.log("ok:", posts[i].owner._id);
            console.log(req.params.userid);
            if (posts[i].owner._id == req.params.userid) {
                userposts.push(posts[i]);
            }
        }
        // console.log(userposts);
        return res.send({ success: true, data: userposts });
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: "Server error" });
    }
};
