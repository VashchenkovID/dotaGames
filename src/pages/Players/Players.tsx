import React from 'react';
import { ProPlayerReqModel } from 'src/api/models/ProPlayerReqModel';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { Button } from '@material-ui/core';
import styles from './Players.styl';
import PlayersHeader from 'src/pages/Players/PlayersHeader/PlayersHeader';
import SimpleBar from 'simplebar-react';
import PlayersRow from 'src/pages/Players/PlayersRow/PlayersRow';
import {useResize} from "src/hooks/useResize";

interface IComponentProps {
  viewPlayers: ProPlayerReqModel[];
  setIsMore: React.Dispatch<React.SetStateAction<number>>;
  isViewButton: boolean;
}

const Players: React.FC<IComponentProps> = ({
  viewPlayers,
  setIsMore,
  isViewButton,
}) => {
    const { width } = useResize();
  return (
    <div className={styles.container}>
      <PageTitle text={'Профессиональные игроки'} />
      <PlayersHeader />
      <SimpleBar style={width > 1000 ? { maxHeight: 'calc(100vh - 360px)' } : {maxHeight:'calc(100vh - 420px)'}}>
        {viewPlayers.length > 0 &&
          viewPlayers.map((match, index) => (
            <PlayersRow key={index} player={match} />
          ))}
      </SimpleBar>
      {viewPlayers.length === 0 && <span>Игроки отсутствуют :(</span>}
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

export default Players;
