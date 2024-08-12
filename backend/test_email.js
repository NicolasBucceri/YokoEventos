const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'yokoeventosprueba@hotmail.com',
    pass: 'jrjzupswmxrcdmhx'
  }
});

const mailOptions = {
  from: 'yokoeventosprueba@hotmail.com',
  to: 'yokoeventosprueba@hotmail.com',
  subject: 'Test Email',
  text: 'This is a test email'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending test email:', error);
  } else {
    console.log('Test email sent:', info.response);
  }
});
