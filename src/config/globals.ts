// Environment variables imported from .env file
export const env = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3030,
	DOMAIN: process.env.DOMAIN,
	REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID,
	REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET,
	REDDIT_REDIRECT_URL: process.env.REDDIT_REDIRECT_URL

};

