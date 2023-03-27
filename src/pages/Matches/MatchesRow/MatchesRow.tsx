import React, { useMemo } from 'react';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import styles from './MatchesRow.styl';
import { durationConverter } from 'src/utils/functions';
import { Tooltip } from '@material-ui/core';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import { differenceInMinutes } from 'date-fns';
import { TeamFullModel } from 'src/api/models/TeamModel';

interface IComponentProps {
  item: ProMatchModel;
  index: number;
  teams?: TeamFullModel[];
}

const MatchesRow: React.FC<IComponentProps> = ({ item, teams }) => {
  const navigate = useNavigate();
  const agoTime = useMemo(() => {
    if (item.start_time) {
      const realStart = new Date(Number(`${item.start_time.toString()}000`));
      const result = differenceInMinutes(new Date(), new Date(realStart));
      if (result > 60) {
        if (result >= 60 * 24) {
          return `День назад`;
        }
        if (Number((result / 60).toFixed(0)) === 1) {
          return `Час назад`;
        }
        if (Number((result / 60).toFixed(0)) < 5) {
          return `${(result / 60).toFixed(0)} часа назад`;
        }

        if (Number((result / 60).toFixed(0)) === 24) {
          return `День назад`;
        }
        return `${(result / 60).toFixed(0)} часов назад`;
      }
      return `${result} минут назад`;
    } else return null;
  }, [item.start_time]);

  //Для лиг
  const teamsNames = useMemo(() => {
    if (teams) {
      const radiant = teams.find((tm) => tm.team_id === item.radiant_team_id);
      const dire = teams.find((tm) => tm.team_id === item.dire_team_id);
      return { radiant: radiant.name, dire: dire.name };
    } else return { radiant: undefined, dire: undefined };
  }, [teams]);

  const duration = useMemo(() => {
    return durationConverter(item.duration);
  }, [item.duration]);
  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          navigate(`${PublicRoutesEnum.MATCH}/${item.match_id}`);
        }}
        className={styles.titleCell}
      >
        <span className={styles.title}>{item.match_id}</span>
        <div className={cn(styles.subTitle, styles.rowHover)}>
          <span className={styles.rowHover}>{agoTime}</span>/
          <Tooltip arrow placement={'top'} title={item.league_name}>
            <div className={cn(styles.league, styles.rowHover)}>
              {item.league_name && item.league_name.length > 16
                ? `${item.league_name.slice(0, 13)}...`
                : item.league_name}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className={styles.cellCenter}>{duration}</div>
      <div
        onClick={() =>
          navigate(`${PublicRoutesEnum.TEAM}/${item.radiant_team_id}`)
        }
        className={cn(styles.rowHover, styles.cellCenter)}
      >
        {item.radiant_name ||
          item.radiant_team_name ||
          teamsNames.radiant ||
          '-'}
      </div>
      <div
        onClick={() =>
          navigate(`${PublicRoutesEnum.TEAM}/${item.dire_team_id}`)
        }
        className={cn(styles.rowHover, styles.cellCenter)}
      >
        {item.dire_name || item.dire_team_name || teamsNames.dire || '-'}
      </div>
    </div>
  );
};

export default MatchesRow;
