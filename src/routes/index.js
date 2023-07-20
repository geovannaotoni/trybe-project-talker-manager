const express = require('express');
const talkerRouter = require('./talkerRoutes');
const loginRouter = require('./loginRoutes');

const rootRouter = express.Router();

rootRouter.use('/talker', talkerRouter);
rootRouter.use('/login', loginRouter);

module.exports = rootRouter;