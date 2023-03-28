import React, { useMemo } from 'react';
import { ProMatchFullModel } from 'src/api/models/ProMatchFullModel';
import styles from './ViewMatchHeader.styl';
import cn from 'classnames/bind';

import WinnerBadge, {
  WinnerSide,
} from 'src/components/WinnerBadge/WinnerBadge';
import { durationConverter } from 'src/utils/functions';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectInitRegions } from 'src/redux/features/init/InitSelectors';
import { differenceInMinutes } from 'date-fns';
import { useResize } from 'src/hooks/useResize';

interface IComponentProps {
  match: ProMatchFullModel;
}

const cx = cn.bind(styles);

const ViewMatchHeader: React.FC<IComponentProps> = ({ match }) => {
  const regions = useAppSelector(selectInitRegions);
  const { width } = useResize();

  const region = useMemo(() => {
    if (regions && regions.length > 0) {
      return regions.find((reg: any) => reg.id === match.region)?.name;
    } else return 'неизвестно';
  }, [regions]);

  const rightSideItems = [
    { id: 0, title: 'ID матча', text: match.match_id },
    {
      id: 1,
      title: 'Регион',
      text: region,
    },
  ];

  const agoTime = useMemo(() => {
    if (match.start_time) {
      const realStart = new Date(Number(`${match.start_time.toString()}000`));
      const result = differenceInMinutes(new Date(), new Date(realStart));
      if (result > 60) {
        if (result === 60 * 24) {
          return `День назад`;
        }
        if (result > 60 * 24) {
          return `${(result / 60 / 24).toFixed(0)} дней назад`;
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
  }, [match.start_time]);
  return (
    <section
      className={cx(styles.container, {
        smallScreen: width <= 800,
      })}
    >
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
