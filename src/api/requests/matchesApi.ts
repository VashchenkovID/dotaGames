import { get } from '../../api';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import { EnpointsEnum } from 'src/api/endpoints';

export default {
  fetchProMatches: (): Promise<ProMatchModel[]> =>
    get(EnpointsEnum.GET_PRO_MATCHES),
};
