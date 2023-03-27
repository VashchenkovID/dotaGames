import React, { useMemo } from 'react';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import styles from './ViewLeagueMatchesRow.styl';
import { differenceInMinutes } from 'date-fns';
import { durationConverter } from 'src/utils/functions';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';

interface IComponentProps {
  match: ProMatchModel;
}

const ViewLeagueMatchesRow: React.FC<IComponentProps> = ({ match }) => {
  const navigate = useNavigate();
  const agoTime = useMemo(() => {
    if (match.start_time) {
      const realStart = new Date(Number(`${match.start_time.toString()}000`));
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
  }, [match.start_time]);

  const duration = useMemo(() => {
    return durationConverter(match.duration);
  }, [match.duration]);
  return (
    <div
      onClick={() => {
        navigate(`${PublicRoutesEnum.MATCH}/${match.match_id}`);
      }}
      className={styles.container}
    >
      <div className={styles.idCell}>
        <div className={styles.idCell__title}>{match.match_id}</div>
        <div>{agoTime}</div>
      </div>
      <div className={styles.cell}>{duration}</div>
      <div className={styles.cell}>
        {match.radiant_score} / {match.dire_score}
      </div>
    </div>
  );
};

export default ViewLeagueMatchesRow;
