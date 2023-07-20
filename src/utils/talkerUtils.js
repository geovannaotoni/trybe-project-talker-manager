const { readData } = require('./fsUtils');

const findTalkerById = async (id) => {
  const talkers = await readData();
  const findTalker = talkers.find((talker) => Number(id) === talker.id);
  return findTalker;
};

module.exports = {
  findTalkerById,
};