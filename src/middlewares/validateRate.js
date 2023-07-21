const rateIsValid = require('../utils/rateIsValid');

const validateRateOnBody = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (!rateIsValid(talk.rate)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
};

const validateRateOnQuery = (req, res, next) => {
  const { rate } = req.query;
  if (rate === undefined 
    || rateIsValid(Number(rate))) {
    return next();
  }

  return res.status(400).json({ 
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  });
};

const validateRatePatch = (req, res, next) => {
  const { rate } = req.body;

  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (!rateIsValid(rate)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
};

module.exports = {
  validateRateOnBody,
  validateRateOnQuery,
  validateRatePatch,
};