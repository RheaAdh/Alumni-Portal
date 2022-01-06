const nodemailer = require("nodemailer");

const emailToken = async (token, receiver, purpose) => {
  try {
    console.log(receiver.email);
    console.log(receiver.username);

    const subject1 = "Reset Password";
    const subject2 = "Verify Email";
    // for now this works https://primus-alumni-portal.herokuapp.com/api/auth/forgotpassword/token
    const output1 = `<p>Hello ${receiver.username}</p>Link for reset password: <a href ="https://primus-alumni-portal.netlify.app/resetpassword/${token}">https://primus-alumni-portal.netlify.app/resetpassword/${token}</a><p>Regards,<br>Primus</p>`;

    // for now this works http://localhost:5000/api/auth/verifyemail/token
    const output2 = `<p>Hello ${receiver.username}</p>Link for email verification: <a href ="https://primus-alumni-portal.netlify.app/verifyemail/${token}">https://primus-alumni-portal.netlify.app/verifyemail/${token}</a><p>Regards,<br>Primus</p>`;

    let output;
    let subject;

    switch (purpose) {
      case 1:
        output = output1;
        subject = subject1;
        break;
      case 2:
        output = output2;
        subject = subject2;
        break;
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.ADMIN_EMAIL, // generated ethereal user
        pass: process.env.ADMIN_EMAIL_PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnathorized: false,
      },
    });

    // send mail with defined transport object
    try {
      let info = await transporter.sendMail({
        from: '"Admin" <primusalums@gmail.com>', // sender address
        to: `${receiver.email}`, // list of receivers
        subject: subject, // Subject line
        text: subject, // plain text body
        html: output, // html body
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = emailToken;
