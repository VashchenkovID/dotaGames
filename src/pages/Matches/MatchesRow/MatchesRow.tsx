import React, { useMemo } from 'react';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import styles from './MatchesRow.styl';
import { durationConverter } from 'src/utils/functions';
import { Tooltip } from '@material-ui/core';
import cn from 'classnames';

interface IComponentProps {
  item: ProMatchModel;
  index: number;
}

const MatchesRow: React.FC<IComponentProps> = ({ item, index }) => {
  const agoTime = useMemo(() => {
    if (item.start_time) {
      const result = new Date().getTime() - item.start_time;
      const days = new Date().getDate() - new Date(result).getDate();
      if (days === 0) {
        const hours = new Date(result).getHours();
        if (hours === 0) {
          const minutes = new Date(result).getMinutes();
          if (minutes === 0) {
            const seconds = new Date(result).getSeconds();
            return `${seconds} секунд назад`;
          }
          return `${minutes} минут назад`;
        }
        return `${hours} часов назад`;
      }
      return `${days} дней назад`;
    } else return null;
  }, [item.start_time]);

  const duration = useMemo(() => {
    return durationConverter(item.duration);
  }, [item.duration]);
  return (
    <div className={styles.container}>
      <div className={styles.titleCell}>
        <span className={styles.title}>{item.match_id}</span>
        <div className={cn(styles.subTitle, styles.rowHover)}>
          <span className={styles.rowHover}>{agoTime}</span>/
          <Tooltip arrow placement={'top'} title={item.league_name}>
            <div className={cn(styles.league, styles.rowHover)}>
              {item.league_name.length > 16
                ? `${item.league_name.slice(0, 13)}...`
                : item.league_name}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className={styles.cellCenter}>{duration}</div>
      <div className={cn(styles.rowHover, styles.cellCenter)}>
        {item.radiant_name}
      </div>
      <div className={cn(styles.rowHover, styles.cellCenter)}>
        {item.dire_name}
      </div>
    </div>
  );
};

export default MatchesRow;
