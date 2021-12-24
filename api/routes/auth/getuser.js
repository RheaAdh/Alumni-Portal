const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        console.log(user.username);
        return res.send({
            success: true,
            data: user,
        });
    } catch (err) {
        console.log(`Error : ${err.message}`);
        res.status(500).json({ success: false, msg: "Server Error." });
    }
};
