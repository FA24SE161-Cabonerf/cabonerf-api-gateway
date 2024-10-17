import 'dotenv/config';

class Config {
	public SERVER_PORT: string;
	public ELASTIC_SEARCH_URL: string;
	public CLIENT_URL: string;
	public BASE_PATH_V1: string;
	public MAIN_SERVICE_URL: string;
	public NODEBASED_SERVICE_URL: string;
	public CLIENT_GATEWAY_SECRET_KEY: string;
	public GATEWAY_SERVICE_SECRET_KEY: string;
	public MAIN_SERVICE_ID_KEY: string;
	public NODEBASED_SERVICE_ID_KEY: string;

	constructor() {
		this.SERVER_PORT = process.env.SERVER_PORT || '';
		this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
		this.CLIENT_URL = process.env.CLIENT_URL || '';
		this.BASE_PATH_V1 = process.env.BASE_PATH_V1 || '';
		this.MAIN_SERVICE_URL = process.env.MAIN_SERVICE_URL || '';
		this.NODEBASED_SERVICE_URL = process.env.NODEBASED_SERVICE_URL || '';
		this.GATEWAY_SERVICE_SECRET_KEY = process.env.GATEWAY_SERVICE_SECRET_KEY || '';
		this.CLIENT_GATEWAY_SECRET_KEY = process.env.CLIENT_GATEWAY_SECRET_KEY || '';
		this.MAIN_SERVICE_ID_KEY = process.env.MAIN_SERVICE_ID_KEY || '';
		this.NODEBASED_SERVICE_ID_KEY = process.env.NODEBASED_SERVICE_ID_KEY || '';
	}
}

const config = new Config();

export default config;
