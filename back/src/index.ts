import "reflect-metadata";
import dotenv from "dotenv";
import AppDataSource from "./config/data-source";
import { PORT } from "./config/envs";
import server from "./server";

dotenv.config();

AppDataSource.initialize()
    .then(() => {
        console.log("database connect")
        server.listen( PORT, () => {
            console.log(`server listeng on localhost:${PORT}`);
        });
    }).catch(error => console.log(error));
