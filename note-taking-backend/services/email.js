const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'siddhunioh0007@gmail.com',
    pass: 'xvycazkejdqqnogc',
  },
});

const sendOTP = async (email, otp) => {
  try {
    console.log('Transporter configured with:', {
      host: 'smtp.gmail.com',
      port: 465,
      user: 'siddhunioh0007@gmail.com',
    });

    const mailOptions = {
      from: 'siddhunioh0007@gmail.com',
      to: email,
      subject: 'OTP for Note-Taking App',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    console.log('Sending email to:', email); 
    const info = await transporter.sendMail(mailOptions); 
    console.log('Email sent successfully:', info.response); 
  } catch (error) {
    console.error('Error sending email:', error); 
    throw error; 
  }
};

module.exports = { sendOTP };