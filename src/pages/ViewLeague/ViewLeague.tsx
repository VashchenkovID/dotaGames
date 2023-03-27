import React from 'react';
import { ViewLeagueState } from 'src/pages/ViewLeague/ViewLeagueContainer';
import styles from './ViewLeague.styl';
import PageTitle from 'src/components/PageTitle/PageTitle';
import ViewLeagueMatches from 'src/pages/ViewLeague/ViewLeagueMatches/ViewLeagueMatches';
import ViewLeagueTeams from 'src/pages/ViewLeague/ViewLeagueTeams/ViewLeagueTeams';

interface IComponentProps {
  league: ViewLeagueState;
}

const ViewLeague: React.FC<IComponentProps> = ({ league }) => {
  return (
    <div className={styles.container}>
      <PageTitle text={league.league.name} />
      <div className={styles.tier}>
        Ранг: <span className={styles.tier__title}>{league.league.tier}</span>
      </div>
      <section className={styles.container__body}>
        <ViewLeagueMatches matches={league.matches} teams={league.teams} />
        <ViewLeagueTeams
          teams={league.teams
            .sort((a, b) => {
              return b.rating - a.rating;
            })
            .filter((team) => team.name !== null && team.name !== '')}
        />
      </section>
    </div>
  );
};

export default ViewLeague;
