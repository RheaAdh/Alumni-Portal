const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.params.username,
            isVerifiedByAdmin: true,
            isVerified: true,
        }).select("-password");
        if (user) {
            return res.send({ success: true, data: user });
        } else {
            return res.send({ success: false, data: "user doesnt exist" });
        }
    } catch (err) {
        console.log(err);
        return res.send({ success: false, data: "Server Error" });
    }
};
