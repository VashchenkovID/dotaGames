export interface ItemsPopularityModel {
  early_game_items: {
    [key: string]: number;
  };
  start_game_items: {
    [key: string]: number;
  };
  mid_game_items: {
    [key: string]: number;
  };
  late_game_items: {
    [key: string]: number;
  };
}
