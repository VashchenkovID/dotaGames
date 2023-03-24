import React, { useMemo } from 'react';
import { TeamByIdMatchesModel } from 'src/api/models/TeamByIdModel';
import styles from './ViewTeamMatchesRow.styl';
import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';

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
    if (match && match.start_time) {
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
  }, [match]);

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
