require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = process.env.SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { username: decoded.data.username } });
    req.user = user;
    if (!user) {
      return res.status(401).json({ message: 'Error to find user token' });      
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
