const express = require('express');
const talkerRouter = require('./talkerRoutes');

const rootRouter = express.Router();

rootRouter.use('/talker', talkerRouter);

module.exports = rootRouter;