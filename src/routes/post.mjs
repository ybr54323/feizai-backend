import { Router } from "express";

import Prisma from "@prisma/client";
import multer from "multer";
import path from "path";
const { PrismaClient } = Prisma;
const postRouter = Router();
const prisma = new PrismaClient({
  
});
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
  fileFilter(_, file, cb) {
    const extname = path.extname(file.originalname).slice(1);
    let flag = true;
    if (!["png", "jpg", "webp", "jpeg", "gif"].includes(extname)) flag = false;
    cb(null, flag);
  },
});
postRouter.post("/post", upload.array("files", 9), async (req, res) => {
  const content = req.body?.content;
  const title = req.body?.title;
  try {
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
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.stack });
  }
});
postRouter.get("/posts", async (req, res) => {
  const size = Number(req.query?.size || 10);
  const page = Number(req.query?.page || 1);
  try {
    const result = await prisma.post.findMany({
      take: size,
      skip: (page - 1) * size,
      include: {
        files: true,
      },
    });
    res.json({ rows: result, total: await prisma.post.count() });
  } catch (err) {
    res.status(400).json({ msg: error.stack });
  }
});
postRouter.delete("/post", async (req, res) => {
  const id = Number(req.query.id);

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: error.stack });
  }
});
postRouter.get("/post", async (req, res) => {
  const id = Number(req.query.id);
  try {
    const result = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    res.json({ row: result });
  } catch (error) {
    res.status(400).json({ msg: error.stack });
  }
});
export default postRouter;
