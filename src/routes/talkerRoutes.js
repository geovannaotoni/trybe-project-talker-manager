const express = require('express');
const { readData, writeData, updateData } = require('../utils/fsUtils');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');
const { findTalkerById } = require('../utils/talkerUtils');
const validateTalkerId = require('../middlewares/validateTalkerId');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', validateTalkerId, async (req, res) => {
  try {
    const { id } = req.params;
    const foundTalker = await findTalkerById(id);

    res.status(200).json(foundTalker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt, 
  validateRate, 
  async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const newTalker = await writeData({ name, age, talk });
    res.status(201).json(newTalker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', 
  validateToken,
  validateTalkerId, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt, 
  validateRate, 
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const updatedTalker = await updateData(Number(id), { name, age, talk });
      res.status(200).json(updatedTalker);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;