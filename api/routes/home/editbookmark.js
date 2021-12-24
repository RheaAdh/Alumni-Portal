const Post = require("../.././models/Post");

module.exports = async (req, res) => {
    //postid,email
    //insert into array of bookmarked
    //if already in bookmarked remove from array{postid,email}
    console.log("edit book");
    try {
        const { postid } = req.body;
        console.log(postid);
        let flag = 0;
        const post = await Post.findOne({ _id: postid }).populate("owner");

        for (let i = 0; i < post.bookmarked.length; i++) {
            if (post.bookmarked[i] === req.user.email) {
                flag = 1;
                break;
            }
        }
        //if flag==1 -> remove email from array
        if (flag == 0) {
            post.bookmarked.push(req.user.email);
            await post.save();
            return res.send({ success: true, data: post, status: true });
        } else {
            post.bookmarked = post.bookmarked.filter(
                (emailid) => emailid !== req.user.email
            );
            await post.save();
            return res.send({ success: true, data: post, status: false });
        }
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
