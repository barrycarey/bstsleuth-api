

import { initRoutes } from './routes.js';
import express from "express";

export class Server {
    private readonly _app: express.Application = express();

    public constructor() {
        console.log('Creating routes')
        initRoutes(this._app);
    }

    /**
     * Get Express app
     *
     * @returns {express.Application} Returns Express app
     */
    public get app(): express.Application {
        return this._app;
    }
}
