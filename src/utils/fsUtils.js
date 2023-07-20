const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = '../talker.json';
const ABS_DATA_PATH = path.resolve(__dirname, DATA_PATH);

// função de leitura
const readData = async () => {
  try {
    const response = await fs.readFile(ABS_DATA_PATH);
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(`Erro na leitura do arquivo: ${error}`);
  }
};

// função de escrita
const writeData = async (newTalker) => {
  try {
    const oldData = await readData();
    const newId = oldData[oldData.length - 1].id + 1;
    const newTalkerWithId = {
      id: newId,
      ...newTalker,
    };
    
    const updatedData = JSON.stringify([...oldData, newTalkerWithId], null, 2);
    await fs.writeFile(ABS_DATA_PATH, updatedData);
    return newTalkerWithId;
  } catch (error) {
    console.log(`Erro na escrita do arquivo: ${error}`);
  }
};

const updateData = async (id, updatedTalker) => {
  try {
    const oldData = await readData();
    const updateTalker = { id, ...updatedTalker };

    const updatedTalkers = oldData.map((talker) => {
      if (talker.id === id) return updateTalker;
      return talker;
    });
    
    const updatedData = JSON.stringify(updatedTalkers, null, 2);
    await fs.writeFile(ABS_DATA_PATH, updatedData);
    return updateTalker;
  } catch (error) {
    console.log(`Erro na atualização do arquivo: ${error}`);
  }
};

const deleteData = async (id) => {
  try {
    const oldData = await readData();
    const filteredData = oldData.filter((talker) => talker.id !== id);
    const updatedData = JSON.stringify(filteredData, null, 2);
    await fs.writeFile(ABS_DATA_PATH, updatedData);
  } catch (error) {
    console.log(`Erro ao deletar informações do arquivo: ${error}`);
  }
};

module.exports = {
  readData,
  writeData,
  updateData,
  deleteData,
};