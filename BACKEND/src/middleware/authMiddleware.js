const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ isAuthenticated: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ isAuthenticated: false, message: 'Invalid token' });
    }

    req.user = user;
    next(); 
  });
};

module.exports = { authenticateToken };
