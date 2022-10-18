import {Router} from "express";
import {WatchRoutes} from "./components/watch/routes";
import {AuthRoutes} from "./components/auth/routes";

export function initRoutes(router: Router): void {
    const prefix: string = '/api/v1'

    router.use(`${prefix}/watch`, new WatchRoutes().router);
    router.use(`${prefix}/auth`, new AuthRoutes().router);
    console.log(router.stack)
}
