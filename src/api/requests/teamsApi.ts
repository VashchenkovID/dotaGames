import { get } from 'src/api';
import { EnpointsEnum } from 'src/api/endpoints';
import { TeamFullModel } from 'src/api/models/TeamModel';

export default {
  fetchTeams: (): Promise<TeamFullModel[]> => get(EnpointsEnum.GET_TEAMS),
};
