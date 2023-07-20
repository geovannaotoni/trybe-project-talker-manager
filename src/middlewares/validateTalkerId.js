const { findTalkerById } = require('../utils/talkerUtils');

module.exports = async (req, res, next) => {
  const { id } = req.params;
    const foundTalker = await findTalkerById(id);
    
    if (!foundTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

  next();
};