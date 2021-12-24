const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        const {profileImage} = req.body;
        const user = await User.findOne({ email: req.user.email });
        user.profileImage = profileImage;
        await user.save();
        return res.send({ success: true, data: user });
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
