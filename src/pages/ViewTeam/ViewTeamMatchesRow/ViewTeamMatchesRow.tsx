import React, { useMemo } from 'react';
import { TeamByIdMatchesModel } from 'src/api/models/TeamByIdModel';
import styles from './ViewTeamMatchesRow.styl';
import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import { differenceInMinutes } from 'date-fns';

interface IComponentProps {
  match: TeamByIdMatchesModel;
}

const cx = cn.bind(styles);

const ViewTeamMatchesRow: React.FC<IComponentProps> = ({ match }) => {
  const navigate = useNavigate();
  const isLastWin = useMemo(() => {
    if (match) {
      if (match.radiant && match.radiant_win) {
        return true;
      }
      if (!match.radiant && match.radiant_win) {
        return false;
      }
      if (!match.radiant && !match.radiant_win) {
        return true;
      }
      if (match.radiant && !match.radiant_win) {
        return false;
      }
    }
  }, [match]);

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
    <div
      onClick={() => navigate(`${PublicRoutesEnum.MATCH}/${match.match_id}`)}
      className={styles.container}
    >
      <div className={styles.cellId}>
        <div className={styles.cellId__id}>{match.match_id}</div>
        <div>{agoTime}</div>
      </div>
      <div
        className={cx(styles.badge, {
          win: isLastWin,
        })}
      >
        {isLastWin ? 'Победа' : 'Поражение'}
      </div>
      <div className={styles.opposingCell}>
        {' '}
        <img
          className={styles.opposingCell__img}
          src={match.opposing_team_logo}
        />
        <span className={styles.opposingCell__name}>
          {match.opposing_team_name}
        </span>
      </div>
      <div className={styles.scoreCell}>
        <span className={styles.score__radiant}>{match.radiant_score}</span> :{' '}
        <span className={styles.score__dire}>{match.dire_score}</span>
      </div>
    </div>
  );
};

export default ViewTeamMatchesRow;
