import express from "express";
import userRoute from "./routes/user.mjs";
import postRouter from "./routes/post.mjs";
import cookieSession from "cookie-session";
import { auth } from "./middleware/auth.mjs";
import utils from "./utils/index.mjs";

try {
  utils.genUserAndPwd();
} catch (error) {
  throw error;
}
const app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());
app.use(
  cookieSession({
    name: "ggasadasaldasd",
    keys: ["ybr"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(auth);
app.use(userRoute);
app.use(postRouter);
app.use("/public", express.static("public"));
const server = app.listen(3000, '0.0.0.0', () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body;
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       author: { connect: { email: authorEmail } },
//     },
//   });
//   res.json(result);
// });

// app.put("/post/:id/views", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await prisma.post.update({
//       where: { id: Number(id) },
//       data: {
//         viewCount: {
//           increment: 1,
//         },
//       },
//     });

//     res.json(post);
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` });
//   }
// });

// app.put("/publish/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const postData = await prisma.post.findUnique({
//       where: { id: Number(id) },
//       select: {
//         published: true,
//       },
//     });

//     const updatedPost = await prisma.post.update({
//       where: { id: Number(id) || undefined },
//       data: { published: !postData.published || undefined },
//     });
//     res.json(updatedPost);
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` });
//   }
// });

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.json(post);
// });

// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.get("/user/:id/drafts", async (req, res) => {
//   const { id } = req.params;

//   const drafts = await prisma.user
//     .findUnique({
//       where: {
//         id: Number(id),
//       },
//     })
//     .posts({
//       where: { published: false },
//     });

//   res.json(drafts);
// });

// app.get(`/post/:id`, async (req, res) => {
//   const { id } = req.params;

//   const post = await prisma.post.findUnique({
//     where: { id: Number(id) },
//   });
//   res.json(post);
// });

// app.get("/feed", async (req, res) => {
//   const { searchString, skip, take, orderBy } = req.query;

//   const or = searchString
//     ? {
//         OR: [
//           { title: { contains: searchString } },
//           { content: { contains: searchString } },
//         ],
//       }
//     : {};

//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//       ...or,
//     },
//     include: { author: true },
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     orderBy: {
//       updatedAt: orderBy || undefined,
//     },
//   });

//   res.json(posts);
// });
