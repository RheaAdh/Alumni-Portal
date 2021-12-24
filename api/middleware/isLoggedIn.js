const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({
            success: false,
            data: "No token found. Please log in again.",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        let user = await User.findOne({ _id: req.user.id });
        if (user.isVerifiedByAdmin) {
            next();
        } else {
            return res.status(401).json({
                success: false,
                data: "Not verified by admin",
            });
        }
    } catch (err) {
        res.status(401).json({
            success: false,
            data: "Token is not valid. Please log in again.",
        });
    }
};
