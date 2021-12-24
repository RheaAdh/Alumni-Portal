const Post = require("../.././models/Post");
const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        const { question, imageLink } = req.body;
        let userid = req.user.id;
        let newpost;
        newpost = await new Post({
            imageLink,
            question: question,
            owner: userid,
            currentDate:Date.now(),
            isAdmin: false,
        });
        console.log("newpost! :non admin");
        await newpost.save();

        newpost = await Post.findOne({_id: newpost.id})
            .populate("owner");
        return res.send({ success: true, data: newpost });
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: "Server error" });
    }
};
