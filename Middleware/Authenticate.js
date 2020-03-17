const authenticate = async (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    res.status(401).send({ err: 'no token in header' });
  } else {
    // verify token and if it is valid call next or res.status(401).send({err:"not"})
    next();
  }
};

module.exports = authenticate;
