import {IComponentRoutes} from "../helpers";
import {WatchController} from "./watchController";
import {Router} from "express";

export class WatchRoutes implements IComponentRoutes<WatchController> {
    readonly name: string = 'watch';
    readonly controller: WatchController = new WatchController();
    readonly router: Router = Router()

    initRoutes(): void {
        this.router.get(
            '/',
            this.controller.getWatches
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
