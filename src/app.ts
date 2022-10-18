import {Server} from "./api/server.js";

console.log('starting')
// Set env variables from .env file
import { config } from 'dotenv';
config();

import express from 'express';

import { createServer, Server as HttpServer } from 'http';


import { env } from './config/globals.js';
import { logger } from './config/logger.js';
import {PrismaClient} from "@prisma/client";
import { RedditStrat} from "./services/auth/strategies/reddit.js";


console.log('Running main')
try {

    // Connect db
    logger.info('Initializing ORM connection...');

    // Init express server
    const app: express.Application = new Server().app;
    const server: HttpServer = createServer(app);
    console.log(app.routes);

    // Start express server
    server.listen(env.NODE_PORT);

    server.on('listening', () => {
        logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
    });

    server.on('close', () => {

        logger.info('node server closed');
    });
} catch (err: any) {
    console.log(err)
}

