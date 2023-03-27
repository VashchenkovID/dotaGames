import { get } from 'src/api';
import { EnpointsEnum } from 'src/api/endpoints';
import { RequestHeroModel } from 'src/api/models/RequestHeroModel';
import { HeroStatsModel } from 'src/api/models/HeroStatsModel';
import { ItemsPopularityModel } from 'src/api/models/ItemsPopularityModel';

export default {
  fetchHeroesList: (): Promise<RequestHeroModel[]> =>
    get(EnpointsEnum.GET_HEROES),
  fetchHeroStats: (): Promise<HeroStatsModel[]> =>
    get(EnpointsEnum.GET_HERO_STATS),
  fetchHeroLore: (): Promise<{ [key: string]: string }> =>
    get(`${EnpointsEnum.INIT}/hero_lore`),
  fetchItemsPopularity: (id: number): Promise<ItemsPopularityModel> =>
    get(`${EnpointsEnum.GET_HEROES}/${id}/${EnpointsEnum.GET_HERO_ITEMS}`),
};
