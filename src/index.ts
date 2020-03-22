import dotenv from "dotenv";
import {Options} from "graphql-yoga";
import {createConnection} from "typeorm";
import app from "./app";
import defaultConnectionOptions from "./ormConfig";

dotenv.config();

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
    port: PORT,
    playground: PLAYGROUND,
    endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(defaultConnectionOptions)
    .then(() => app.start(appOptions, handleAppStart))
    .catch(error => console.error(error));