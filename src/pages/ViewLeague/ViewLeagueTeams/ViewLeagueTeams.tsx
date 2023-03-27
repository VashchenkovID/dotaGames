import React, { useMemo } from 'react';
import { TeamFullModel } from 'src/api/models/TeamModel';
import TeamsHeader from 'src/pages/Teams/TeamsHeader/TeamsHeader';
import TeamsRow from 'src/pages/Teams/TeamsRow/TeamsRow';
import styles from './ViewLeagueTeams.styl';
import SimpleBar from 'simplebar-react';
interface IComponentProps {
  teams: TeamFullModel[];
}

const ViewLeagueTeams: React.FC<IComponentProps> = ({ teams }) => {
  const maxParams = useMemo(() => {
    if (teams && teams.length > 0) {
      return {
        maxRating: teams
          .map((team) => team.rating)
          .reduce((x, y) => Math.max(x, y)),
        maxWins: teams
          .map((team) => team.wins)
          .reduce((x, y) => Math.max(x, y)),
        maxLosses: teams
          .map((team) => team.losses)
          .reduce((x, y) => Math.max(x, y)),
      };
    } else
      return {
        maxRating: 0,
        maxWins: 0,
        maxLosses: 0,
      };
  }, [teams]);
  return (
    <div className={styles.container}>
      <TeamsHeader />
      {teams.length > 0 && (
        <SimpleBar className={styles.rows}>
          {teams.map((team, index) => (
            <TeamsRow
              key={`${team.team_id}_${index}`}
              team={team}
              position={index}
              maxParams={maxParams}
            />
          ))}
        </SimpleBar>
      )}
      {teams.length === 0 && (
        <span>На лигу еще не зарегистрирована ни одна команда</span>
      )}
    </div>
  );
};

export default ViewLeagueTeams;
