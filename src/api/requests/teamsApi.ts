import { get } from 'src/api';
import { EnpointsEnum } from 'src/api/endpoints';
import { TeamFullModel } from 'src/api/models/TeamModel';
import {
  TeamByIdHeroesModel,
  TeamByIdMatchesModel,
  TeamByIdModel,
  TeamByIdPlayersModel,
} from 'src/api/models/TeamByIdModel';

export default {
  fetchTeams: (): Promise<TeamFullModel[]> => get(EnpointsEnum.GET_TEAMS),
  fetchTeamById: (id: number): Promise<TeamByIdModel> =>
    get(`${EnpointsEnum.GET_TEAM_BY_ID}/${id}`),
  fetchTeamByIdMatches: (id: number): Promise<TeamByIdMatchesModel> =>
    get(`${EnpointsEnum.GET_TEAM_BY_ID}/${id}/matches`),
  fetchTeamByIdPlayers: (id: number): Promise<TeamByIdPlayersModel> =>
    get(`${EnpointsEnum.GET_TEAM_BY_ID}/${id}/players`),
  fetchTeamByIdHeroes: (id: number): Promise<TeamByIdHeroesModel> =>
    get(`${EnpointsEnum.GET_TEAM_BY_ID}/${id}/heroes`),
};
