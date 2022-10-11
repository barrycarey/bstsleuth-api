import {Router} from "express";
import {WatchRoutes} from "./components/watch/routes";

export function initRoutes(router: Router): void {
    const prefix: string = '/api/v1'

    router.use(`${prefix}/watch`, new WatchRoutes().router);
    console.log(router.stack)
}
