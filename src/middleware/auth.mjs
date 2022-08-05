export const auth = (req, res, next) => {
  const whites = ["/login", "/logout", '/posts'];
  const fileReg = /jpe?g|png|gif/;
  if (whites.includes(req.path)) return next();
  // 文件请求
  if (fileReg.test(req.originalUrl)) return next();
  if (!req.session.logined) {
    res.status(401);
    res.json({});
    return;
  }
  next();
};
