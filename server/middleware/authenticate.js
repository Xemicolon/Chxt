exports.authenticate = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).json({
      message: "You're not logged in!",
    });
    return;
  }
  next();
};
