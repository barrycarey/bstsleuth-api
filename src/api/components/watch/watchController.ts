import {NextFunction, Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import {bind} from "decko";

export class WatchController {

    private readonly prisma = new PrismaClient()

    @bind()
    async getWatches(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const watches = await this.prisma.watch.findMany();
            return res.json(watches);
        } catch (err: any) {
            console.log(err)
        }


    }

    @bind
    async getWatchByUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { username } = req.query;
    }

    @bind
    async createWatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {


    }

    @bind
    async modifyWatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    }
}
