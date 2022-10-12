import { logger } from '../config/logger';

/**
 * UtilityService
 *
 * Service for utility functions
 */
export class UtilityService {
	/**
	 * Error handler
	 *
	 * @param err
	 * @returns
	 */
	public static handleError(err: any): void {
		logger.error(err.stack || err);
	}


}
