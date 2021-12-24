const Post = require("../.././models/Post");

module.exports = async (req, res) => {
    //postid,email
    //insert into array of liked
    //if already in liked remove from array{postid,email}
    console.log("edit like");
    try {
        const { postid } = req.body;
        let flag = 0;
        const post = await Post.findOne({ _id: postid }).populate("owner");

        for (let i = 0; i < post.liked.length; i++) {
            if (post.liked[i] === req.user.email) {
                flag = 1;
                break;
            }
        }
        //if flag==1 -> remove email from array
        if (flag == 0) {
            post.liked.push(req.user.email);
            await post.save();
            return res.send({ success: true, data: post, status: true });
        } else {
            post.liked = post.liked.filter(
                (emailid) => emailid !== req.user.email
            );
            await post.save();
            return res.send({ success: true, data: post, status: false });
        }
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
