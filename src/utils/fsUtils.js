const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = '../talker.json';

// função de leitura
const readData = async () => {
  try {
    const response = await fs.readFile(path.resolve(__dirname, DATA_PATH));
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readData,
};