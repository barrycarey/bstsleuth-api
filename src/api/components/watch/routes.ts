import {IComponentRoutes} from "../helpers.js";
import {WatchController} from "./watchController.js";
import {Router} from "express";

export class WatchRoutes implements IComponentRoutes<WatchController> {
    readonly name: string = 'watch';
    readonly controller: WatchController = new WatchController();
    readonly router: Router = Router()

    constructor() {
        this.initRoutes();
    }

    initRoutes(): void {
        this.router.get(
            '/',
            this.controller.getWatches.bind(this.controller)
        );

        this.router.get(
            '/:username',
            this.controller.getWatchByUser
        );

        this.router.post(
            '/',
            this.controller.createWatch
        );

        this.router.patch(
            '/',
            this.controller.modifyWatch
        )

    }

}
