import {IComponentRoutes} from "../helpers.js";
import {AuthController} from "./controller.js";
import {Router} from "express";

export class AuthRoutes implements IComponentRoutes<AuthController> {
    readonly name: string = 'auth';
    readonly controller: AuthController = new AuthController();
    readonly router: Router = Router();

    constructor() {
        this.initRoutes();
    }


    initRoutes(): void {
        this.router.post(
            '/reddit/callback',
            this.controller.signinUser.bind(this)
        )
    }

}
