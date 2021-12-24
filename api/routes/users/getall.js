const User = require("../../models/User");

module.exports = async (req, res) => {
    console.log("get all");
    try {
        const users = await User.find({}).exec();
        return res.send({ success: true, data: users });
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
