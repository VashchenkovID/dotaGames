import React from 'react';
import { TeamFullModel } from 'src/api/models/TeamModel';
import PageTitle from 'src/components/PageTitle/PageTitle';
import styles from './Teams.styl';
import { Button } from '@material-ui/core';
import TeamsHeader from 'src/pages/Teams/TeamsHeader/TeamsHeader';
import TeamsRow from 'src/pages/Teams/TeamsRow/TeamsRow';
import SimpleBar from 'simplebar-react';

interface IComponentProps {
  viewTeams: TeamFullModel[];
  isViewButton: boolean;
  setIsMore: React.Dispatch<React.SetStateAction<number>>;
  maxParams: { maxRating: number; maxWins: number; maxLosses: number };
}

const Teams: React.FC<IComponentProps> = ({
  isViewButton,
  setIsMore,
  viewTeams,
  maxParams,
}) => {
  return (
    <section className={styles.container}>
      <PageTitle text={'Команды'} />
      <TeamsHeader />
      <SimpleBar style={{ maxHeight: 'calc(100vh - 360px)' }}>
        {viewTeams.length > 0 &&
          viewTeams.map((team, index) => (
            <TeamsRow
              team={team}
              key={`${team.team_id}_${index}`}
              position={index}
              maxParams={maxParams}
            />
          ))}
      </SimpleBar>
      {isViewButton && (
        <article className={styles.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsMore((prevState) => prevState + 1);
            }}
          >
            Загрузить еще
          </Button>
        </article>
      )}
    </section>
  );
};

export default Teams;
