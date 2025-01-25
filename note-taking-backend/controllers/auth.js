
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../services/email');

exports.signup = async (req, res) => {
  const { name, email, dateOfBirth } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 

  try {
    console.log('Received signup request:', { name, email, dateOfBirth }); 

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, dateOfBirth, otp, otpExpiry });
    await user.save();

    await sendOTP(email, otp);
    res.status(201).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error in /signup:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Received login request:', { email }); 

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error in /login:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    console.log('Received OTP verification request:', { email, otp }); 

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp !== otp || new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in /verify-otp:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};