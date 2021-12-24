const Post = require("../../models/Post");
const Response = require("../../models/Response");

module.exports = async (req, res) => {
    console.log("getcomment");

    try {
        const { postid } = req.body;
        const comments = await Response.find({ postid: postid })
            .populate("owner")
            .sort({
                _id: -1,
            });
        // console.log(comments);
        return res.send({ success: true, data: comments });
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: err });
    }
};
