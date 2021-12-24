const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        const {
            profileImage,
            college,
            gradYear,
            company,
            prevCompany,
            designation,
            prevDesignation,
            yearsOfExp,
            location,
            house,
        } = req.body;
        console.log(req.body);
        const user = await User.updateOne(
            { email: req.user.email },
            {
                $set: {
                    college,
                    designation,
                    prevDesignation,
                    gradYear,
                    prevCompany,
                    company,
                    yearsOfExp,
                    location,
                    house,
                },
            }
        );
        return res.send({ success: true, data: user });
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
