const express = require('express');
const { readData } = require('../utils/fsUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readData();
    const findElem = data.find((talker) => Number(id) === talker.id);
    if (!findElem) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(findElem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;