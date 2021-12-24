const jwt = require("jsonwebtoken");
const User = require("../../models/User");
module.exports = async (req, res) => {
    try {
        console.log("grtuserfrom token backend");
        const token = jwt.verify(req.params.token, process.env.JWT_SECRET);
        console.log("token:");
        console.log(token);
        if (!token)
            return res.send({ success: false, data: "No token found." });
        const user = await User.findOne({ email: token.user.email });
        console.log(user._id);
        if (user) {
            return res.send({ success: true, data: user });
        } else {
            return res.send({ success: false, data: "No token" });
        }
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
