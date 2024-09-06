import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRouter from "./routes/indexRouter";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors())
server.use(indexRouter);

server.get("/", (req, res) => res.send("server listen"));

export default server;