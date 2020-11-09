exports.authenticate = (req, res, next) => {
  console.log(req.session);
  if (!req.session.user && !req.session.isLoggedIn) {
    res.status(401).json({
      message: "You're not logged in!",
    });
    return;
  }
  next();
};
