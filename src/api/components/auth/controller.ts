import {NextFunction, Request, Response} from "express";
import {AuthService} from "../../../services/auth";

export class AuthController {
    private readonly authService: AuthService = new AuthService();

    async signinUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    }
}
