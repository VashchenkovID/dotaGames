import React, { useMemo, useRef } from 'react';
import { PlayerModel } from 'src/api/models/PlayerModel';
import { useAppSelector } from 'src/hooks/useAppSelector';
import {
  selectInitHeroes,
  selectInitItems,
} from 'src/redux/features/init/InitSelectors';
import styles from './ViewMatchTeamTableRow.styl';
import cn from 'classnames';
import { converterInThousand } from 'src/utils/functions';
import ViewMatchTeamTableRowBackpack from 'src/pages/ViewMatch/ViewMatchTeamTableRowBackpack/ViewMatchTeamTableRowBackpack';

interface IComponentProps {
  player: PlayerModel;
}

const ViewMatchTeamTableRow: React.FC<IComponentProps> = ({ player }) => {
  const heroes = useAppSelector(selectInitHeroes);
  const url = process.env.REACT_APP_API_URL_IMAGE;
  const items = useAppSelector(selectInitItems);

  const heroLogo: any = useMemo(() => {
    if (heroes && player.hero_id) {
      return Object.values(heroes).find(
        (hero: any) => hero.id === player.hero_id,
      );
    } else return undefined;
  }, [heroes, player.hero_id]);

  const backpackItems = useMemo(() => {
    return {
      items: [
        player.item_0,
        player.item_1,
        player.item_2,
        player.item_3,
        player.item_4,
        player.item_5,
      ],
      backpack: [player.backpack_0, player.backpack_1, player.backpack_2],
      neutral: player.item_neutral,
    };
  }, [player]);

  const width = window.innerWidth;

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
          <div className={styles.playerInfo__name}>{player.personaname}</div>
          <div className={styles.playerInfo__hero}>
            {heroLogo?.localized_name}
          </div>
        </div>
      </div>
      <div className={styles.cell}>{player.level}</div>
      <div className={cn(styles.cell, styles.kills)}>{player.kills}</div>
      <div className={cn(styles.cell, styles.deaths)}>{player.deaths}</div>
      <div className={styles.cell}>{player.assists}</div>
      <div className={styles.cell}>
        {player.last_hits}/{player.denies}
      </div>
      {width > 1450 && (
        <div className={cn(styles.cell, styles.netWorth)}>
          {converterInThousand(player.net_worth)}
        </div>
      )}
      {width > 1450 && (
        <div className={styles.cell}>
          {converterInThousand(player.total_gold)} /{' '}
          {converterInThousand(player.total_xp)}
        </div>
      )}
      {width > 1450 && (
        <div className={styles.cell}>
          {converterInThousand(player.hero_damage)}
        </div>
      )}
      {width > 1450 && (
        <div className={styles.cell}>
          {converterInThousand(player.tower_damage)}
        </div>
      )}
      {width > 1450 && (
        <div className={styles.cell}>
          {converterInThousand(player.hero_healing)}
        </div>
      )}
      <div>
        {items && (
          <ViewMatchTeamTableRowBackpack backpackItems={backpackItems} />
        )}
      </div>
    </div>
  );
};

export default ViewMatchTeamTableRow;
