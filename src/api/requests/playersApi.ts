import { get } from 'src/api';
import { EnpointsEnum } from 'src/api/endpoints';
import { ProPlayerReqModel } from 'src/api/models/ProPlayerReqModel';

export default {
  fetchPlayers: (): Promise<ProPlayerReqModel[]> =>
    get(EnpointsEnum.GET_PLAYERS),
};
