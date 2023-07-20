const { readData } = require('./fsUtils');

const findTalkerById = async (id) => {
  const talkers = await readData();
  const findTalker = talkers.find((talker) => Number(id) === talker.id);
  return findTalker;
};

const filterTalkerByName = async (q) => {
  const talkers = await readData();
  if (q) {
    return talkers.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()));
  }
  return talkers;
};

module.exports = {
  findTalkerById,
  filterTalkerByName,
};