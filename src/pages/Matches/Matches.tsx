import React from 'react';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import MatchesHeader from 'src/pages/Matches/MatchesHeader/MatchesHeader';
import { Button } from '@material-ui/core';
import styles from './Matches.styl';
import MatchesRow from 'src/pages/Matches/MatchesRow/MatchesRow';
interface IComponentProps {
  viewMatches: ProMatchModel[];
  isViewButton: boolean;
  setIsMore: React.Dispatch<React.SetStateAction<number>>;
}
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const Matches: React.FC<IComponentProps> = ({
  viewMatches,
  isViewButton,
  setIsMore,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.title}>Список матчей</div>
      <MatchesHeader />
      <SimpleBar style={{ maxHeight: 'calc(100vh - 360px)' }}>
        {viewMatches.length > 0 &&
          viewMatches.map((match, index) => (
            <MatchesRow key={index} item={match} index={index} />
          ))}
      </SimpleBar>
      {viewMatches.length === 0 && <span>Матчи отсутствуют :(</span>}
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

export default Matches;
