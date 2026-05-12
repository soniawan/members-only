const isGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/log-in");
  }
  return next();
};

export { isGuest, isAuth };