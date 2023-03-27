import { get } from 'src/api';
import { EnpointsEnum } from 'src/api/endpoints';
import { LeagueModelReq } from 'src/api/models/LeagueModelReq';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import { TeamFullModel } from 'src/api/models/TeamModel';

export default {
  fetchLeagues: (): Promise<LeagueModelReq[]> => get(EnpointsEnum.GET_LEAGUES),
  fetchLeague: (id: number): Promise<LeagueModelReq> =>
    get(`${EnpointsEnum.GET_LEAGUES}/${id}`),
  fetchLeagueMatches: (id: number): Promise<ProMatchModel[]> =>
    get(`${EnpointsEnum.GET_LEAGUES}/${id}/matches`),
  fetchLeagueTeams: (id: number): Promise<TeamFullModel[]> =>
    get(`${EnpointsEnum.GET_LEAGUES}/${id}/teams`),
};
