const express = require('express');
const generateToken = require('../utils/generateToken');
const validatePassword = require('../middlewares/validatePassword');
const validateEmail = require('../middlewares/validateEmail');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (req, res) => {
  try {
    const token = generateToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;