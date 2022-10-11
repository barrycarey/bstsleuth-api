import {NextFunction, Request, Response} from "express";
import {PrismaClient} from "@prisma/client";

export class WatchController {

    private readonly prisma = new PrismaClient()

    async getWatches(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const watches = {id: 'test'}
        //const watches = await this.prisma.watch.findMany();
        return res.json(watches);
    }

    async getWatchByUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { username } = req.query;
    }

    async createWatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {


    }

    async modifyWatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    }
}
