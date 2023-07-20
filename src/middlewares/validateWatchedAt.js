const validateWatchedAtOnBody = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  const dateRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  const validDate = dateRegex.test(watchedAt);

  if (!validDate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateWatchedAtOnQuery = (req, res, next) => {
  const { date } = req.query;

  const dateRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  const validDate = dateRegex.test(date);

  if (!date || validDate) {
    return next();
  }

  return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
};

module.exports = {
  validateWatchedAtOnBody,
  validateWatchedAtOnQuery,
};