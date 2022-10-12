import {NextFunction, Request, Response} from "express";
import {PrismaClient} from "@prisma/client";

export class WatchController {

    private readonly prisma = new PrismaClient()

    async getWatches(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const watches = await this.prisma.watch.findMany();
            return res.json(watches);
        } catch (err: any) {
            console.log(err)
        }


    }

    async getWatchByUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { username } = req.query;
    }

    async createWatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {


    }

    async modifyWatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

    }
}
