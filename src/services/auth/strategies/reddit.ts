import { bind } from 'decko';
import { Handler, NextFunction, Request, Response } from 'express';
import passport from "passport";

import {env} from "../../../config/globals.js";
import {PrismaClient} from "@prisma/client";

import {RedditStrategy} from 'passport-reddit';
//let RedditStrategy = await import('passport-reddit')


/**
 * Passport JWT Authentication
 *
 * - The client signs in via /signin endpoint
 * - If the signin is successfull a JWT is returned
 * - This JWT is used inside the request header for later requests
 */
export class RedditStrat {

    private readonly prisma = new PrismaClient();
    protected _strategy: passport.Strategy

    public constructor() {
        this._strategy = new RedditStrategy({
            clientID: env.REDDIT_CLIENT_ID,
            clientSecret: env.REDDIT_CLIENT_SECRET,
            callbackURL: env.REDDIT_REDIRECT_URL
        }, this.verify);
    }

    public get strategy(): passport.Strategy {
        return this._strategy;
    }

    /**
     * Middleware for checking if a user is authorized to access the endpoint
     *
     * @param req Express request
     * @param res Express response
     * @param next Express next
     * @returns Returns if user is authorized
     */

    isAuthorized(req: Request, res: Response, next: NextFunction): Handler | void {
        try {
            passport.authenticate('reddit', (err, user) => {
                console.log(user)
                // internal error
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(401).json({
                        error: 'User is not authorized!'
                    });
                }

                // success - store user in req scope
                req.user = user;


                return next();
            })(req, res, next);
        } catch (err) {
            return next(err);
        }
    }

    @bind
    private async verify(accessToken: string, refreshToken: string, profile: any, next: any): Promise<void> {
        try {
            // pass error == null on error otherwise we get a 500 error instead of 401

            const user = await this.prisma.user.upsert({
                where: {username: profile.name},
                update: {},
                create: {
                    username: profile.name,
                    is_mod: false,
                    patreon_tier_id: 1,
                    is_exempt: false
                }
            })

            return next(null, user);
        } catch (err) {
            return next(err);
        }
    }
}
