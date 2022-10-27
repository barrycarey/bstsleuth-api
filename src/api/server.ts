

import { initRoutes } from './routes.js';
import express from "express";
import expressSession from 'express-session'
import passport from "passport";

export class Server {
    private readonly _app: express.Application = express();

    public constructor() {
        this._app.use(expressSession({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true
        }))
        passport.serializeUser(function(user, done) {
            done(null, user)
        })

        passport.deserializeUser(function(obj: any, done) {
            done(null, obj)
        })
        this._app.use(passport.initialize())
        this._app.use(passport.session())
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
