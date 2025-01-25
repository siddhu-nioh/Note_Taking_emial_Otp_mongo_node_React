const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profile');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;