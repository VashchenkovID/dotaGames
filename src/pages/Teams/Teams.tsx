import React from 'react';
import { TeamFullModel } from 'src/api/models/TeamModel';
import PageTitle from 'src/components/PageTitle/PageTitle';
import styles from 'src/pages/Matches/Matches.styl';
import { Button } from '@material-ui/core';

interface IComponentProps {
  viewTeams: TeamFullModel[];
  isViewButton: boolean;
  setIsMore: React.Dispatch<React.SetStateAction<number>>;
}

const Teams: React.FC<IComponentProps> = ({
  isViewButton,
  setIsMore,
  viewTeams,
}) => {
  console.log(viewTeams);
  return (
    <div>
      <PageTitle text={'Команды'} />
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
    </div>
  );
};

export default Teams;
