import React from 'react';
import { ViewTeamStateType } from 'src/pages/ViewTeam/ViewTeamContainer';
import PageTitle from 'src/components/PageTitle/PageTitle';
import styles from './ViewTeam.styl';
import ViewTeamInfo from 'src/pages/ViewTeam/ViewTeamInfo/ViewTeamInfo';
import ViewTeamPlayers from 'src/pages/ViewTeam/ViewTeamPlayers/ViewTeamPlayers';
import ViewTeamMatches from 'src/pages/ViewTeam/ViewTeamMatches/ViewTeamMatches';
import ViewTeamHeroes from 'src/pages/ViewTeam/ViewTeamHeroes/ViewTeamHeroes';
import SimpleBar from 'simplebar-react';

interface IComponentProps {
  teamView: ViewTeamStateType;
  team: ViewTeamStateType;
  setTeamView: React.Dispatch<React.SetStateAction<ViewTeamStateType>>;
}

const ViewTeam: React.FC<IComponentProps> = ({
  teamView,
  team,
  setTeamView,
}) => {
  return (
    <section className={styles.container}>
      <PageTitle text={'Детальная информация о команде'} />
      <section className={styles.container__body}>
        <div className={styles.container__body__column}>
          <ViewTeamInfo team={team.team} lastMatch={teamView.matches[0]} />
          <ViewTeamPlayers players={teamView.players} />
        </div>
        <div className={styles.container__body__column}>
          <ViewTeamMatches
            matches={teamView.matches}
            setTeamView={setTeamView}
            team={team}
          />
          <ViewTeamHeroes
            heroes={teamView.heroes}
            team={team}
            setTeamView={setTeamView}
          />
        </div>
      </section>
    </section>
  );
};

export default ViewTeam;
