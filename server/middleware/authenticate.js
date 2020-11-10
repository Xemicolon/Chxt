exports.authenticate = (req, res, next) => {
  if (!req.session.user && !req.session.isLoggedIn) {
    res.status(401).json({
      success: false,
      message: "You're not logged in!",
    });
    return;
  }
  next();
};
