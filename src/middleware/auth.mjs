export const auth = (req, res, next) => {
  const whites = ["/login", "/logout", "/posts"];
  if (whites.includes(req.path)) return next();

  if (!req.session.logined) {
    res.status(401);
    res.json({});
    return;
  }
  next();
};
