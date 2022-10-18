import {Router} from "express";
import {WatchRoutes} from "./components/watch/routes.js";
import {AuthRoutes} from "./components/auth/routes.js";

export function initRoutes(router: Router): void {
    const prefix: string = '/api/v1'

    router.use(`${prefix}/watch`, new WatchRoutes().router);
    router.use(`${prefix}/auth`, new AuthRoutes().router);
    console.log(router.stack)
}
