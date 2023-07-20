const express = require('express');
const generateToken = require('../utils/generateToken');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const token = generateToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;