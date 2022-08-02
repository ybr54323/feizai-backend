import { Router } from "express";

import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
const postRouter = Router();
const prisma = new PrismaClient();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/");
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const extname = path.extname(file.originalname).slice(1);
    let flag = true;
    if (!["png", "jpg", "webp", "jpeg", "gif"].includes(extname)) flag = false;
    cb(null, flag);
  },
});
postRouter.post("/post", upload.array("files", 9), async (req, res) => {
  const content = req.body?.content;
  const title = req.body?.title;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      files: {
        create: req.files.map((file) => {
          return {
            name: file.filename,
          };
        }),
      },
    },
  });
  res.json(result);
});
postRouter.get("/posts", async (req, res) => {
  const size = +req.query?.size || 10;
  const page = +req.query?.page || 1;
  const result = await prisma.post.findMany({
    take: size,
    skip: (page - 1) * size,
    include: {
      files: true,
    },
  });
  res.json(result);
});
export default postRouter;
