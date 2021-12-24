const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
    try {
        let user = await User.findOne({ _id: req.user.id });
        if (user) {
            if (user.isAdmin) {
                next();
            } else {
                return res.send({ success: false, data: "not admin" });
            }
        } else {
            return res.send({ success: false, data: "not registered" });
        }
    } catch (err) {
        res.status(401).json({
            success: false,
            data: "Server Error",
        });
    }
};
