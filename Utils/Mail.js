const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../Config/Logger');

const sendMail = (subject, mailBody, mailID, html = null) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'test@gmail.com',
      pass: 'sadcvdv'
    }
  });
  let mailOptions;
  if (!html) {
    mailOptions = {
      from: 'test@getMaxListeners.com',
      to: mailID,
      subject,
      text: mailBody
    };
  } else {
    console.log('sending html');
    mailOptions = {
      from: 'Team <gmail@gmail.com>',
      to: mailID,
      subject,
      html: mailBody
    };
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendMail;
