import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import matchesApi from 'src/api/requests/matchesApi';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import { CircularProgress } from '@material-ui/core';
import style from './Matches.styl';
import Matches from 'src/pages/Matches/Matches';

const MatchesContainer: React.FC = () => {
  //Все матчи
  const [matches, setMatches] = useState<ProMatchModel[]>([]);
  //Отображаемые матчи
  const [viewMatches, setViewMatches] = useState<ProMatchModel[]>([]);
  //Подгрузка матчей (на api нет пагинации)
  const [isMore, setIsMore] = useState(1);
  const [isViewButton, setIsViewButton] = useState(true);
  //Request
  const { load: fetchDotaMatches, isLoading } = useRequest(
    matchesApi.fetchProMatches,
    (data) => {
      if (data) {
        setMatches(data);
        setViewMatches(data.slice(0, 10));
      }
    },
  );
  useEffect(() => {
    fetchDotaMatches();
  }, []);

  useEffect(() => {
    if (isMore) {
      setViewMatches(matches.slice(0, 10 * isMore));
      if (isMore > matches.length / 10) {
        setIsViewButton(false);
      } else setIsViewButton(true);
    }
  }, [isMore, matches]);
  return (
    <div>
      {isLoading && (
        <div className={style.loader}>
          <CircularProgress />
        </div>
      )}
      {!isLoading && viewMatches.length > 0 && (
        <Matches
          viewMatches={viewMatches}
          isViewButton={isViewButton}
          setIsMore={setIsMore}
        />
      )}
      {!isLoading && viewMatches.length === 0 && (
        <span>Информация о матчах отсутствует</span>
      )}
    </div>
  );
};

export default MatchesContainer;
