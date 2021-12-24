const User = require("../../models/User");
const { v4: uuidv4 } = require("uuid");
module.exports = async (req, res) => {
    console.log("verify email");
    try {
        let compareToken = req.params.token;
        console.log(compareToken);

        let user = await User.findOne({ token: compareToken });
        console.log(user);

        if (user) {
            await User.updateOne(
                { token: compareToken },
                { $set: { isVerified: true, token: uuidv4() } }
            );

            console.log("User Verified and token reset");

            return res.send({
                success: true,
                data: "Email Verified, Redirect to Login",
            });
        } else {
            return res.send({ success: false, data: "Invalid Token" });
        }
    } catch (err) {
        console.log(err);
        return res.send({ success: false, msg: "Server Error" });
    }
};
