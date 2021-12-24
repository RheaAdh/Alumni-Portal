const User = require("../.././models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    console.log("in login backend");
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.send({
                success: false,
                data: "User is not registered.",
            });
        }

        if (!user.isVerified) {
            return res.send({
                success: false,
                data: "User is not verified yet, check inbox",
            });
        }
        if (!user.isVerifiedByAdmin) {
            return res.send({
                success: false,
                data: "User is not verified by admin yet.",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send({ success: false, data: "Incorrect Password" });
        }

        //IMP
        const payload = {
            user: { id: user._id, email: user.email },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "720h",
        });

        console.log(token);

        return res.send({
            success: true,
            data: "User successfully logged in!",
            token: token,
            user: user,
        });
    } catch (err) {
        console.log(`Error : ${err.message}`);
        return res.send({ success: false, data: "Server Error" });
    }
};
