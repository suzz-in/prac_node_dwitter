import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import dotenv from "dotenv";
import { config } from "./config.js";
import { Server } from "socket.io";
import { initSocket } from "./connection/socket.js";
import { db, sequelize } from "./db/database.js";

dotenv.config();

const app = express();

//사용할 미들웨어 세팅
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

//"/tweets"에 관련된 요청은 tweetsRoute에 가도록
app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

sequelize.sync().then((client) => {
  //데이터베이스에 연결 되고 난 이후 서버를 실행한다.
  const server = app.listen(config.host.port);
  initSocket(server);
});
