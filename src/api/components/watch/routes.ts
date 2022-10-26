import {IComponentRoutes} from "../helpers.js";
import {WatchController} from "./watchController.js";
import {Router} from "express";
import {AuthService} from "../../../services/auth/index.js";

export class WatchRoutes implements IComponentRoutes<WatchController> {
    readonly name: string = 'watch';
    readonly controller: WatchController = new WatchController();
    readonly router: Router = Router()
    authSerivce: AuthService;

    constructor() {
        this.authSerivce = new AuthService()
        this.initRoutes();

    }

    initRoutes(): void {
        this.router.get(
            '/',
            this.authSerivce.isAuthorized(),
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
