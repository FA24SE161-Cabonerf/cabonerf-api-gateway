import config from '@gateway/config';
import { AxiosService } from '@gateway/services/axios.service';

const nodebasedAxiosService = new AxiosService(config.NODEBASED_SERVICE_URL, config.NODEBASED_SERVICE_ID_KEY);

export default nodebasedAxiosService;
