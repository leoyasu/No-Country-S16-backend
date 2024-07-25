import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});


export const sendEmail = (to, subject, text) => {
    const mailOptions = {
      from: 'chealth@consultoriosChealth.com',
      to,
      subject,
      text,
    };
    
    return transporter.sendMail(mailOptions);
  };