import React from 'react';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import ViewLeagueMatchesHeader from 'src/pages/ViewLeague/ViewLeagueMatchesHeader/ViewLeagueMatchesHeader';
import ViewLeagueMatchesRow from 'src/pages/ViewLeague/ViewLeagueMatchesRow/ViewLeagueMatchesRow';
import SimpleBar from 'simplebar-react';
import styles from './ViewLeagueMatches.styl';
import MatchesRow from 'src/pages/Matches/MatchesRow/MatchesRow';
import MatchesHeader from 'src/pages/Matches/MatchesHeader/MatchesHeader';
import { TeamFullModel } from 'src/api/models/TeamModel';

interface IComponentProps {
  matches: ProMatchModel[];
  teams: TeamFullModel[];
}

const ViewLeagueMatches: React.FC<IComponentProps> = ({ matches, teams }) => {
  return (
    <div className={styles.container}>
      <MatchesHeader />
      {matches.length > 0 && (
        <SimpleBar className={styles.rows}>
          {matches.map((match, index) => (
            <MatchesRow item={match} key={index} index={index} teams={teams} />
          ))}
        </SimpleBar>
      )}
      {matches.length === 0 && (
        <span>В данной лиге еще не проводились матчи</span>
      )}
    </div>
  );
};

export default ViewLeagueMatches;
