import React, { useEffect, useState } from 'react';
import { ProPlayerReqModel } from 'src/api/models/ProPlayerReqModel';
import useRequest from 'src/hooks/useRequest';
import playersApi from 'src/api/requests/playersApi';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import Players from 'src/pages/Players/Players';

interface IComponentProps {}

const PlayersContainer: React.FC = () => {
  const [players, setPlayers] = useState<ProPlayerReqModel[]>([]);
  const [viewPlayers, setViewPlayers] = useState<ProPlayerReqModel[]>([]);
  //Подгрузка игроков (на api нет пагинации)
  const [isMore, setIsMore] = useState(1);
  const [isViewButton, setIsViewButton] = useState(true);

  const { load: fetchPlayersList, isLoading } = useRequest(
    playersApi.fetchPlayers,
    (data) => {
      if (data) {
        setPlayers(data);
        setViewPlayers(data.slice(0, 10));
      }
    },
  );

  useEffect(() => {
    fetchPlayersList();
  }, []);

  useEffect(() => {
    if (isMore) {
      setViewPlayers(players.slice(0, 10 * isMore));
      if (isMore > players.length / 10) {
        setIsViewButton(false);
      } else setIsViewButton(true);
    }
  }, [isMore, players]);
  return (
    <div>
      {isLoading && <ScreenLoader />}
      {!isLoading && (
        <Players
          viewPlayers={viewPlayers}
          setIsMore={setIsMore}
          isViewButton={isViewButton}
        />
      )}
    </div>
  );
};

export default PlayersContainer;
