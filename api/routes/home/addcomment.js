const Post = require("../../models/Post");
const Response = require("../../models/Response");

module.exports = async (req, res) => {
    try {
        const { commenttext, postid } = req.body;
        let userid = req.user.id;
        const newcomment = await new Response({
            postid: postid,
            answer: commenttext,
            owner: userid,
        }).populate("owner");
        console.log("newcomment");
        await newcomment.save();
        return res.send({
            success: true,
            data: "added comment",
            comment: newcomment,
        });
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: "Server error" });
    }
};
