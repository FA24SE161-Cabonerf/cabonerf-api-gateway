import 'dotenv/config';

class Config {
	// TO CLIENT
	public NODE_ENV: string;
	public SERVER_PORT: string;
	public CLIENT_URL: string;
	public MAIN_SERVICE_URL: string;
	public NODEBASED_SERVICE_URL: string;
	public ELASTIC_SEARCH_URL: string;
	public CLIENT_GATEWAY_SECRET_KEY: string;
	public GATEWAY_SERVICE_SECRET_KEY: string;
	public MAIN_SERVICE_ID_KEY: string;
	public NODEBASED_SERVICE_ID_KEY: string;

	// FROM ENV
	private MAIN_SERVICE_K8S_URL: string;
	private NODEBASED_SERVICE_K8S_URL: string;
	private ELASTIC_SEARCH_K8S_URL: string;
	private MAIN_SERVICE_LOCAL_URL: string;
	private NODEBASED_SERVICE_LOCAL_URL: string;
	private ELASTIC_SEARCH_LOCAL_URL: string;

	constructor() {
		this.NODE_ENV = process.env.NODE_ENV || '';
		this.SERVER_PORT = process.env.SERVER_PORT || '';
		this.CLIENT_URL = process.env.CLIENT_URL || '';
		this.MAIN_SERVICE_K8S_URL = process.env.MAIN_SERVICE_K8S_URL || '';
		this.NODEBASED_SERVICE_K8S_URL = process.env.NODEBASED_SERVICE_K8S_URL || '';
		this.ELASTIC_SEARCH_K8S_URL = process.env.ELASTIC_SEARCH_K8S_URL || '';
		this.MAIN_SERVICE_LOCAL_URL = process.env.MAIN_SERVICE_LOCAL_URL || '';
		this.NODEBASED_SERVICE_LOCAL_URL = process.env.NODEBASED_SERVICE_LOCAL_URL || '';
		this.ELASTIC_SEARCH_LOCAL_URL = process.env.ELASTIC_SEARCH_LOCAL_URL || '';
		this.CLIENT_GATEWAY_SECRET_KEY = process.env.CLIENT_GATEWAY_SECRET_KEY || '';
		this.GATEWAY_SERVICE_SECRET_KEY = process.env.GATEWAY_SERVICE_SECRET_KEY || '';
		this.MAIN_SERVICE_ID_KEY = process.env.MAIN_SERVICE_ID_KEY || '';
		this.NODEBASED_SERVICE_ID_KEY = process.env.NODEBASED_SERVICE_ID_KEY || '';

		if (this.NODE_ENV === 'k8s') {
			this.MAIN_SERVICE_URL = this.MAIN_SERVICE_K8S_URL;
			this.NODEBASED_SERVICE_URL = this.NODEBASED_SERVICE_K8S_URL;
			this.ELASTIC_SEARCH_URL = this.ELASTIC_SEARCH_K8S_URL;
		} else {
			this.MAIN_SERVICE_URL = this.MAIN_SERVICE_LOCAL_URL;
			this.NODEBASED_SERVICE_URL = this.NODEBASED_SERVICE_LOCAL_URL;
			this.ELASTIC_SEARCH_URL = this.ELASTIC_SEARCH_LOCAL_URL;
		}
	}
}

const config = new Config();
export default config;
