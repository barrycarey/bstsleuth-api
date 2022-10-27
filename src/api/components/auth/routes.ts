import {IComponentRoutes} from "../helpers.js";
import {AuthController} from "./controller.js";
import {Router} from "express";
import {AuthService} from "../../../services/auth/index.js";

export class AuthRoutes implements IComponentRoutes<AuthController> {
    readonly name: string = 'auth';
    readonly controller: AuthController = new AuthController();
    readonly router: Router = Router();
    authSerivce: AuthService;

    constructor() {
        this.authSerivce = new AuthService();
        this.initRoutes();
    }


    initRoutes(): void {
        this.router.get(
            '/reddit/callback',
            this.authSerivce.isAuthorized(),
            this.controller.signinUser.bind(this)
        )
        this.router.get(
            '/',
            this.controller.loginPage.bind(this)
        )
    }

}
