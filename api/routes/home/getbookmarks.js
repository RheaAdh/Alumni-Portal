const Post = require("../../models/Post");
const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        console.log("inside gettt bookmarks");
        console.log(req.user);
        const posts = await Post.find({}).populate("owner").exec();
        let ans = [];
        for (let i = 0; i < posts.length; i++) {
            for (let j = 0; j < posts[i].bookmarked.length; j++) {
                if (posts[i].bookmarked[j] === req.user.email) {
                    ans.push(posts[i]);
                    break;
                }
            }
            
        }
        return res.send({ success: true, data: ans });
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: "Server error" });
    }
};
