const nodemailer = require('nodemailer');

const sendMail = (subject, mailBody, mailID, html = null) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'gmail@gmail.com',
      pass: 'gmailpass'
    }
  });
  let mailOptions;
  if (!html) {
    mailOptions = {
      from: 'Team <gmail@gmail.com>',
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
