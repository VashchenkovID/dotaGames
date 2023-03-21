import React, { useMemo } from 'react';
import { ProMatchFullModel } from 'src/api/models/ProMatchFullModel';
import styles from './ViewMatchHeader.styl';
import cn from 'classnames/bind';

import WinnerBadge, {
  WinnerSide,
} from 'src/components/WinnerBadge/WinnerBadge';
import { durationConverter } from 'src/utils/functions';

interface IComponentProps {
  match: ProMatchFullModel;
}

const cx = cn.bind(styles);

const ViewMatchHeader: React.FC<IComponentProps> = ({ match }) => {
  const rightSideItems = [
    { id: 0, title: 'ID матча', text: match.match_id },
    { id: 1, title: 'Лига', text: match.league.name },
  ];
  const agoTime = useMemo(() => {
    if (match.start_time) {
      const result = new Date().getTime() - match.start_time;
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
  }, [match.start_time]);
  return (
    <section className={styles.container}>
      <div className={styles.leftSide}>
        <WinnerBadge
          winner={match.radiant_win ? WinnerSide.RADIANT : WinnerSide.DIRE}
        />
      </div>
      <div className={styles.centerSide}>
        <div className={cx(styles.score, styles.radiantColor)}>
          {match.radiant_score}
        </div>
        <div className={styles.centerSide__container}>
          <div className={styles.tier}>{match.league.tier}</div>
          <div className={styles.duration}>
            {durationConverter(match.duration)}:00
          </div>
          <div className={styles.timeAgo}>Закончился {agoTime}</div>
        </div>
        <div className={cx(styles.score, styles.direColor)}>
          {match.dire_score}
        </div>
      </div>{' '}
      <div className={styles.rightSide}>
        {rightSideItems.map((itm) => (
          <div className={styles.infoContainer} key={itm.id}>
            <div className={styles.infoContainer__title}>{itm.title}</div>
            <div className={styles.infoContainer__text}>{itm.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewMatchHeader;
