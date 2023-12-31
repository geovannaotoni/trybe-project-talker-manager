const express = require('express');
const { readData, writeData, updateData, deleteData } = require('../utils/fsUtils');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const { 
  validateWatchedAtOnBody, validateWatchedAtOnQuery,
} = require('../middlewares/validateWatchedAt');
const { 
  validateRateOnBody, validateRateOnQuery, validateRatePatch,
} = require('../middlewares/validateRate');
const { findTalkerById, filterTalkerByName } = require('../utils/talkerUtils');
const validateTalkerId = require('../middlewares/validateTalkerId');
const { findAll } = require('../db/talkerDB');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/search', 
  validateToken, 
  validateRateOnQuery,
  validateWatchedAtOnQuery,
  async (req, res) => {
  try {
    const { q, rate, date } = req.query;
    let filteredTalkers = await filterTalkerByName(q);

    if (rate) {
      filteredTalkers = filteredTalkers.filter((talker) => talker.talk.rate === Number(rate));
    }

    if (date) {
      filteredTalkers = filteredTalkers.filter((talker) => talker.talk.watchedAt === date);
    }

    res.status(200).json(filteredTalkers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/db', async (req, res) => {
  try {
    const data = await findAll();
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
  validateWatchedAtOnBody, 
  validateRateOnBody, 
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
  validateWatchedAtOnBody, 
  validateRateOnBody, 
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

router.delete('/:id', 
  validateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      await deleteData(Number(id));
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.patch('/rate/:id',
  validateToken,
  validateTalkerId,
  validateRatePatch,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { rate } = req.body;
      const foundTalker = await findTalkerById(id);
      foundTalker.talk.rate = rate;
      await updateData(Number(id), foundTalker);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;