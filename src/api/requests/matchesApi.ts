import { get } from '../../api';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import { EnpointsEnum } from 'src/api/endpoints';
import { ProMatchFullModel } from 'src/api/models/ProMatchFullModel';

export default {
  fetchProMatches: (): Promise<ProMatchModel[]> =>
    get(EnpointsEnum.GET_PRO_MATCHES),
  fetchFullProMatch: (id: string): Promise<ProMatchFullModel> =>
    get(`${EnpointsEnum.GET_MATCH}/${id}`),
};
