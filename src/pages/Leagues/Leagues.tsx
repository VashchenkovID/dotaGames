import React from 'react';
import { LeagueModelReq } from 'src/api/models/LeagueModelReq';
import styles from 'src/pages/Players/Players.styl';
import PageTitle from 'src/components/PageTitle/PageTitle';
import SimpleBar from 'simplebar-react';
import { Button } from '@material-ui/core';
import LeaguesHeader from 'src/pages/Leagues/LeaguesHeader/LeaguesHeader';
import LeaguesRow from 'src/pages/Leagues/LeaguesRow/LeaguesRow';

interface IComponentProps {
  leaguesView: LeagueModelReq[];
  isViewButton: boolean;
  setIsMore: React.Dispatch<React.SetStateAction<number>>;
}

const Leagues: React.FC<IComponentProps> = ({
  leaguesView,
  isViewButton,
  setIsMore,
}) => {
  return (
    <div className={styles.container}>
      <PageTitle text={'Лиги и турниры'} />
      <LeaguesHeader />
      <SimpleBar style={{ maxHeight: 'calc(100vh - 360px)' }}>
        {leaguesView.length > 0 &&
          leaguesView.map((item, index) => (
            <LeaguesRow key={index} item={item} />
          ))}
      </SimpleBar>
      {leaguesView.length === 0 && <span>Лиги отсутствуют :(</span>}
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

export default Leagues;
