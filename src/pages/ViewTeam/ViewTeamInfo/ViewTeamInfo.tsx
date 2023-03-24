import React, { useMemo } from 'react';
import styles from './ViewTeamInfo.styl';
import cn from 'classnames/bind';
import {
  TeamByIdMatchesModel,
  TeamByIdModel,
} from 'src/api/models/TeamByIdModel';

interface IComponentProps {
  team: TeamByIdModel;
  lastMatch: TeamByIdMatchesModel | undefined;
}

const cx = cn.bind(styles);

const ViewTeamInfo: React.FC<IComponentProps> = ({ team, lastMatch }) => {
  const isLastWin = useMemo(() => {
    if (lastMatch) {
      if (lastMatch.radiant && lastMatch.radiant_win) {
        return true;
      }
      if (!lastMatch.radiant && lastMatch.radiant_win) {
        return false;
      }
      if (!lastMatch.radiant && !lastMatch.radiant_win) {
        return true;
      }
      if (lastMatch.radiant && !lastMatch.radiant_win) {
        return false;
      }
    }
  }, [lastMatch]);

  const agoTime = useMemo(() => {
    if (lastMatch && lastMatch.start_time) {
      const result = new Date().getTime() - lastMatch.start_time;
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
  }, [lastMatch]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img className={styles.title__img} src={team.logo_url} />
        <span className={styles.title__name}>{team.name}</span>
      </div>
      <div className={styles.stats}>
        <div className={styles.stats__rating}>Рейтинг:{team.rating}</div>
        <div className={styles.stats__wins}>Побед:{team.wins}</div>
        <div className={styles.stats__losses}>Поражений:{team.losses}</div>
      </div>
      {lastMatch && (
        <div className={styles.lastMatch}>
          <div className={styles.lastMatch__stats}>
            <div>Последний матч:</div>
            <div
              className={cx(styles.badge, {
                win: isLastWin,
              })}
            >
              {isLastWin ? 'Победа' : 'Поражение'}
            </div>
          </div>
          <div className={styles.lastMatch__header}>
            <div>ID</div>
            <div className={styles.lastMatch__row__cell}>Противник</div>
            <div className={styles.lastMatch__row__cell}>Счет</div>
          </div>
          <div className={styles.lastMatch__row}>
            <div>
              <div className={styles.lastMatch__id}>{lastMatch.match_id}</div>
              <div>{agoTime}</div>
            </div>
            <div>
              <div className={styles.lastMatch__title}>
                <img
                  className={styles.lastMatch__title__img}
                  src={lastMatch.opposing_team_logo}
                />
                <span className={styles.lastMatch__title__name}>
                  {lastMatch.opposing_team_name}
                </span>
              </div>
            </div>
            <div className={styles.score}>
              <div className={styles.lastMatch__row__cell}>
                <span className={styles.score__radiant}>
                  {lastMatch.radiant_score}
                </span>{' '}
                :{' '}
                <span className={styles.score__dire}>
                  {lastMatch.dire_score}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeamInfo;
