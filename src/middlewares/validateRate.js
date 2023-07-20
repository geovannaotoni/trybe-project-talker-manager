const validateRateOnBody = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
};

const validateRateOnQuery = (req, res, next) => {
  const { rate } = req.query;
  if (rate === undefined 
    || (Number(rate) >= 1 && Number(rate) <= 5 && Number.isInteger(Number(rate)))) {
    return next();
  }

  return res.status(400).json({ 
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  });
};

module.exports = {
  validateRateOnBody,
  validateRateOnQuery,
};