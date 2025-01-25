require('dotenv').config(); // Load environment variables
const { sendOTP } = require('./email'); // Adjust the path as needed

const testEmail = async () => {
  try {
    await sendOTP('hvnsiddhu7@gmail.com', '@HVNSking.123'); // Replace with a valid email
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

testEmail();