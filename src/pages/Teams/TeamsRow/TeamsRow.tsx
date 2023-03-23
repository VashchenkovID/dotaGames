import React from 'react';
import { TeamFullModel } from 'src/api/models/TeamModel';
import styles from './TeamsRow.styl';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
interface IComponentProps {
  team: TeamFullModel;
  position: number;
  maxParams: { maxRating: number; maxWins: number; maxLosses: number };
}

const TeamsRow: React.FC<IComponentProps> = ({ team, position, maxParams }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`${PublicRoutesEnum.TEAM}/${team.team_id}`);
      }}
      className={styles.container}
    >
      <div>{position + 1}st</div>
      <div className={styles.teamName}>
        <img className={styles.teamName__img} src={`${team.logo_url}`} />
        <span className={styles.teamName__name}>{team.name}</span>
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
