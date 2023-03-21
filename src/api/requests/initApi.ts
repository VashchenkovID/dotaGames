import { get } from 'src/api';
import { EnpointsEnum } from 'src/api/endpoints';

export default {
  fetchInit: (model: string): Promise<any> =>
    get(`${EnpointsEnum.INIT}/${model}`),
};
