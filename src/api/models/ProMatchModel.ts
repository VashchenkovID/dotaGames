export interface ProMatchModel {
  match_id: number;
  duration: number;
  start_time: number;
  radiant_team_id: number;
  radiant_name: string;
  dire_team_id: number;
  dire_name: string;
  leagueid: number;
  league_name: string;
  series_id: number;
  series_type: number;
  radiant_score: number;
  dire_score: number;
  radiant_win: boolean;
  radiant: boolean;
  match_seq_num: number;
  tower_status_radiant: number;
  tower_status_dire: number;
  barracks_status_radiant: number;
  barracks_status_dire: number;
  cluster: number;
  first_blood_time: number;
  lobby_type: number;
  human_players: number;
  positive_votes: number;
  negative_votes: number;
  game_mode: number;
  engine: number;
  picks_bans: {
    is_pick: boolean;
    hero_id: number;
    team: number;
    order: number;
  }[];
  radiant_team_name: string | null;
  dire_team_name: string | null;
  radiant_team_complete: number;
  dire_team_complete: number;
  radiant_captain: number;
  dire_captain: number;
  chat: {
    time: number;
    type: string;
    key: string;
    slot: number;
    player_slot: number;
  }[];
  objectives: {
    time: number;
    type: string;
    slot: number;
    key: number;
    player_slot: number;
  }[];

  radiant_gold_adv: number[];
  radiant_xp_adv: number[];
  teamfights: any[];
  version: number;
  cosmetics: { [key: string]: number }[];
  draft_timings: any[];
}
