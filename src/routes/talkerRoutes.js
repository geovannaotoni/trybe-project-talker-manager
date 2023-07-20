const express = require('express');
const { readData } = require('../utils/fsUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await readData();
  res.status(200).json(data);
});

module.exports = router;