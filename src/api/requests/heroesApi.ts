import { get } from 'src/api';
import { EnpointsEnum } from 'src/api/endpoints';
import { RequestHeroModel } from 'src/api/models/RequestHeroModel';

export default {
  fetchHeroesList: (): Promise<RequestHeroModel[]> =>
    get(EnpointsEnum.GET_HEROES),
};
