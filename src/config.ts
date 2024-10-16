import 'dotenv/config';

class Config {
	public SERVER_PORT: string | undefined;
	public ELASTIC_SEARCH_URL: string | undefined;
	public CLIENT_URL: string | undefined;

	constructor() {
		this.SERVER_PORT = process.env.SERVER_PORT || '';
		this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
		this.CLIENT_URL = process.env.CLIENT_URL || '';
	}
}

const config = new Config();

export default config;
