const Post = require("../.././models/Post");

module.exports = async (req, res) => {
    try {
        const posts = await Post.find({ isAdmin: true })
            .populate("owner")
            .sort({
                _id: -1,
            });
        if (posts) return res.send({ success: true, data: posts });
        else return res.send({ success: false, data: "no admin posts" });
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: "Server error" });
    }
};
