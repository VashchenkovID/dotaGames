import React, { useMemo } from 'react';
import { PlayerModel } from 'src/api/models/PlayerModel';
import { useAppSelector } from 'src/hooks/useAppSelector';
import {
  selectInitHeroes,
  selectInitItems,
} from 'src/redux/features/init/InitSelectors';
import styles from './ViewMatchTeamTableRow.styl';

interface IComponentProps {
  player: PlayerModel;
}

const ViewMatchTeamTableRow: React.FC<IComponentProps> = ({ player }) => {
  const items = useAppSelector(selectInitItems);
  const heroes = useAppSelector(selectInitHeroes);
  const url = process.env.REACT_APP_API_URL_IMAGE;

  const heroLogo: any = useMemo(() => {
    if (heroes && player.hero_id) {
      return Object.values(heroes).find(
        (hero: any) => hero.id === player.hero_id,
      );
    } else return undefined;
  }, [heroes, player.hero_id]);
  return (
    <div className={styles.row}>
      <div className={styles.playerCell}>
        <div className={styles.icon}>
          <div className={styles.icon__line}></div>
          <img
            className={styles.icon__img}
            src={`${url}${heroLogo?.img}` || undefined}
          />
        </div>
        <div className={styles.playerInfo}>
          <div className={styles.playerInfo__name}>{player.name}</div>
          <div className={styles.playerInfo__hero}>
            {heroLogo?.localized_name}
          </div>
        </div>
      </div>
      <div className={styles.cell}>{player.level}</div>
      <div className={styles.cell}>{player.kills}</div>
      <div className={styles.cell}>{player.deaths}</div>
      <div className={styles.cell}>{player.assists}</div>
      <div className={styles.cell}>
        {player.last_hits}/{player.denies}
      </div>
      {/*Если длина больше или равна 5 прибавить k и округлить до 1 десятой*/}
      <div className={styles.cell}>{player.net_worth}</div>
      <div className={styles.cell}>
        {player.total_gold}/{player.total_xp}
      </div>
      <div className={styles.cell}>{player.hero_damage}</div>
      <div className={styles.cell}>{player.tower_damage}</div>
      <div className={styles.cell}>{player.hero_healing}</div>
    </div>
  );
};

export default ViewMatchTeamTableRow;
