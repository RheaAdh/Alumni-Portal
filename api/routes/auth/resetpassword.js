const User = require("../../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    try {
        let urltoken = req.params.token;
        console.log("urltoken" + urltoken);
        const hashpwd = await bcrypt.hash(req.body.password, 10);
        let user = await User.findOne({ token: urltoken });
        if (user) {
            //reset token and take in new password and set new password in db
            user.token = uuidv4();
            user.password = hashpwd;

            await user.save();

            return res.send({
                success: true,
                data: "Password Reset successful",
            });
        } else {
            return res.send({
                success: false,
                data: "Something went wrong on your end",
            });
        }
    } catch (err) {
        console.log(err);
        return res.send({ success: false, data: "Server Error" });
    }
};
