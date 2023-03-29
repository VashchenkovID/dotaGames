export interface IRouteItem {
  path: string;
  element: JSX.Element;
}

export const enum PublicRoutesEnum {
  INFO_PAGE = '/info',
  GENERAL = '/general',
  MATCHES = '/matches',
  HEROES = '/heroes',
  TEAMS = '/teams',
  MATCH = '/matches/view',
  TEAM = '/teams/view',
  HERO = '/heroes/view',
  LEAGUES = '/leagues',
  PLAYERS = '/players',
  LEAGUE = '/leagues/view',
  PLAYER = '/players/view',
}
