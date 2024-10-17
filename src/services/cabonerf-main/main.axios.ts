import config from '@gateway/config';
import { AxiosService } from '@gateway/services/axios.service';

const mainAxiosService = new AxiosService(config.MAIN_SERVICE_URL, config.MAIN_SERVICE_ID_KEY);

export default mainAxiosService;
