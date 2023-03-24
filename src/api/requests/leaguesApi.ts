import { get } from 'src/api';
import { EnpointsEnum } from 'src/api/endpoints';
import { LeagueModelReq } from 'src/api/models/LeagueModelReq';

export default {
  fetchLeagues: (): Promise<LeagueModelReq[]> => get(EnpointsEnum.GET_LEAGUES),
};
