const Post = require("../.././models/Post");
const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        let { userid } = req.body;
        let user = await User.findOne({ _id: userid });

        if (user) {
            if (user.isVerifiedByAdmin) {
                return res.send({ success: false, data: "already verified" });
            } else {
                user.isVerifiedByAdmin = true;
                await user.save();
                return res.send({ success: true, data: "user verified" });
            }
        } else {
            return res.send({ success: false, data: "user doesnt exist" });
        }
    } catch (err) {
        return res.send({ success: false, data: "Server error" });
    }
};
