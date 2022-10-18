import { bind } from 'decko';
import { Handler, NextFunction, Request, Response } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';
import { use } from 'passport';
import {ExtractJwt, Strategy as Strategy_Jwt, StrategyOptions} from 'passport-jwt';
import { validationResult } from 'express-validator';

import { env } from '../../config/globals';

import {RedditStrat} from "./strategies/reddit";

export type PassportStrategy = 'reddit';

/**
 * AuthService
 *
 * Available passport strategies for authentication:
 *  - JWT (default)
 *
 * Pass a strategy when initializing module routes to setup this strategy for the complete module: Example: new UserRoutes('jwt')
 *
 * To setup a strategy for individual endpoints in a module pass the strategy on isAuthorized call
 * Example: isAuthorized('basic')
 */
export class AuthService {
	private defaultStrategy: PassportStrategy;
	private redditStrategy: RedditStrat;

	public constructor(defaultStrategy: PassportStrategy = 'reddit') {
		// Setup default strategy -> use jwt if none is provided
		this.defaultStrategy = defaultStrategy;
		this.redditStrategy = new RedditStrat();
	}


	/**
	 * Middleware for verifying user permissions from acl
	 *
	 * @param resource Requested resource
	 * @param action Performed action on requested resource
	 * @returns Returns if action on resource is allowed
	 */
	public hasPermission(resource: string, action: string): Handler {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {

				const access = true; // TODO strip after reddit auth

				if (!access) {
					return res.status(403).json({
						error: 'Missing user rights!'
					});
				}

				return next();
			} catch (err) {
				return next(err);
			}
		};
	}

	/**
	 * Init passport strategies
	 *
	 * @returns
	 */
	public initStrategies(): void {
		use('reddit', this.redditStrategy.strategy);
	}

	/**
	 * Setup target passport authorization
	 *
	 * @param strategy Passport strategy
	 * @returns Returns if user is authorized
	 */
	@bind
	public isAuthorized(strategy?: PassportStrategy): Handler {
		return (req: Request, res: Response, next: NextFunction) => {
			try {
				if (env.NODE_ENV !== 'test') {
					// if no strategy is provided use default strategy
					const tempStrategy: PassportStrategy = strategy || this.defaultStrategy;
					return this.doAuthentication(req, res, next, tempStrategy);
				}


				return next();
			} catch (err) {
				return next(err);
			}
		};
	}

	@bind
	public validateRequest(req: Request, res: Response, next: NextFunction): Response | void {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}

		return next();
	}

	/**
	 * Executes the target passport authorization
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @param strategy Passport strategy name
	 * @returns Returns if user is authorized
	 */
	@bind
	private doAuthentication(
		req: Request,
		res: Response,
		next: NextFunction,
		strategy: PassportStrategy
	): Handler | void {
		try {
			switch (strategy) {
				case 'reddit':
					return this.redditStrategy.isAuthorized(req, res, next);
				default:
					throw new Error(`Unknown passport strategy: ${strategy}`);
			}
		} catch (err) {
			return next(err);
		}
	}


}
