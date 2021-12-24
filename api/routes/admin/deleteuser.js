const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        let { userid } = req.body;
        let user = await User.findByIdAndDelete({
            _id: userid,
        });
        return res.send({ success: true, data: "user deleted" });
    } catch (err) {
        console.log("err:");
        console.log(err);
        return res.send({ success: false, data: "Server error" });
    }
};
