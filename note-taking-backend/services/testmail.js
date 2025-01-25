require('dotenv').config(); 
const { sendOTP } = require('./email'); 

const testEmail = async () => {
  try {
    await sendOTP('hvnsiddhu7@gmail.com', '@HVNSking.123'); 
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

testEmail();