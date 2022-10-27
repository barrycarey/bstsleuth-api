import {NextFunction, Request, Response} from "express";
import {AuthService} from "../../../services/auth/index.js";
import {bind} from "decko";

export class AuthController {
    private readonly authService: AuthService = new AuthService();

    @bind
    async signinUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        return res.json({'thing': 'signed in'})
    }

    @bind
    async loginPage(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        return res.json({'thing': 'login'})
    }
}
