import {NextFunction, Request, Response} from "express";
import {AuthService} from "../../../services/auth/index.js";

export class AuthController {
    private readonly authService: AuthService = new AuthService();

    async signinUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        this.authService.isAuthorized()
    }

    async loginPage(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        return res.json({'thing': 'login'})
    }
}
