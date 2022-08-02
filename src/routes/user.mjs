import express from "express";
import utils from "../utils/index.mjs";
const userRoute = express.Router();
const { genUserAndPwd } = utils;

userRoute.post("/login", (req, res) => {
  /**
   * -u --user
   * -p --pwd
   *
   */
  const [u, p] = genUserAndPwd();

  if (!u || !p) {
    res.status(500);
    res.json({});

    req.session.logined = false;
    return;
  }
  const user = req.body?.user;
  const pwd = req.body?.pwd;

  if (user && pwd && user === u && pwd === p) {
    req.session.logined = true;
    return res.json({ success: true });
  }
  res.status(401);
  res.json({ success: false });

  req.session.logined = false;
});

export default userRoute;
