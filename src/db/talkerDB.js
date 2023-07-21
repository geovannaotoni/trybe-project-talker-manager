const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM talkers');
  const talkersList = result.map((talker) => ({
    name: talker.name,
    age: talker.age,
    id: talker.id,
    talk: {
      watchedAt: talker.talk_watched_at,
      rate: talker.talk_rate,
    },
  }));
  return talkersList;
};

module.exports = {
  findAll,
};