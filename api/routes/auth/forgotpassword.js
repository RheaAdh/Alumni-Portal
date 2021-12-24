const sendEmail = require("./email");
const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        let { email } = req.body;
        let user = await User.findOne({ email: email });
        if (user) {
            sendEmail(user.token, user, 1);

            return res.send({
                success: true,
                data: "Check email for reset link",
            });
        } else {
            return res.send({
                success: false,
                data: "Email not registered with us",
            });
        }
    } catch (err) {
        console.log(`Error : ${err.message}`);
        res.status(500).json({ success: false, msg: "Server Error." });
    }
};
