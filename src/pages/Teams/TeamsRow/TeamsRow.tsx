import React from 'react';
import { TeamFullModel } from 'src/api/models/TeamModel';
import styles from './TeamsRow.styl';
import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import { useResize } from 'src/hooks/useResize';
interface IComponentProps {
  team: TeamFullModel;
  position: number;
  maxParams: { maxRating: number; maxWins: number; maxLosses: number };
}

const cx = cn.bind(styles);

const TeamsRow: React.FC<IComponentProps> = ({ team, position, maxParams }) => {
  const navigate = useNavigate();
  const { width } = useResize();
  return (
    <div
      onClick={() => {
        navigate(`${PublicRoutesEnum.TEAM}/${team.team_id}`);
      }}
      className={styles.container}
    >
      <div>{position + 1}st</div>
      <div
        className={cx(styles.teamName, {
          smallScreen: width <= 1030,
        })}
      >
        {team.logo_url && (
          <img className={styles.teamName__img} src={`${team.logo_url}`} />
        )}
        <span
          className={cx(styles.teamName__name, {
            smallScreen: width <= 1030,
          })}
        >
          {team.name}
        </span>
      </div>
      <div>
        <span>{team.rating}</span>
        <meter
          className={styles.meter}
          min={0}
          low={maxParams.maxRating * 0.7}
          high={maxParams.maxRating * 0.9}
          max={maxParams.maxRating}
          value={team.rating}
        />
      </div>
      <div>
        <span>{team.wins}</span>
        <meter
          className={styles.meter}
          min={0}
          low={maxParams.maxWins * 0.7}
          high={maxParams.maxWins * 0.9}
          max={maxParams.maxWins}
          value={team.wins}
        />
      </div>
      <div>
        <span>{team.losses}</span>
        <meter
          className={styles.meter}
          min={0}
          low={maxParams.maxLosses * 0.7}
          high={maxParams.maxLosses * 0.9}
          max={maxParams.maxLosses}
          value={team.losses}
        />
      </div>
    </div>
  );
};

export default TeamsRow;
