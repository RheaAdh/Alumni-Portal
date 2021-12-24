const Post = require("../.././models/Post");
const User = require("../.././models/User");
const Response = require("../../models/Response");
module.exports = async (req, res) => {
    console.log("del post");
    try {
        const { postid } = req.body;
        let post = await Post.findOne({ _id: postid });
        console.log(post.owner);
        // if (user.isAdmin || email == req.user.email) {
        //     await Response.deleteMany({ postid: postid });
        //     await Post.deleteOne({ _id: postid });
        //     return res.send({ success: true, data: "deleted post" });
        // } else {
        //     return res.send({
        //         success: false,
        //         data: "you cannot delete post as you didnt create post ",
        //     });
        // }
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: "Server error" });
    }
};
