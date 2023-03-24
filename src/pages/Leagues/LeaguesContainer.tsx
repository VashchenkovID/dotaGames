import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import leaguesApi from 'src/api/requests/leaguesApi';
import { LeagueModelReq } from 'src/api/models/LeagueModelReq';
import Leagues from 'src/pages/Leagues/Leagues';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';

const LeaguesContainer: React.FC = () => {
  const [leagues, setLeagues] = useState<LeagueModelReq[]>([]);
  const [leaguesView, setLeaguesView] = useState<LeagueModelReq[]>([]);

  //Подгрузка игроков (на api нет пагинации)
  const [isMore, setIsMore] = useState(1);
  const [isViewButton, setIsViewButton] = useState(true);

  const { load: fetchLeaguesList, isLoading } = useRequest(
    leaguesApi.fetchLeagues,
    (data) => {
      if (data) {
        setLeagues(data);
        setLeaguesView(data.slice(0, 10));
      }
    },
  );

  useEffect(() => {
    fetchLeaguesList();
  }, []);

  useEffect(() => {
    if (isMore) {
      setLeaguesView(leagues.slice(0, 10 * isMore));
      if (isMore > leagues.length / 10) {
        setIsViewButton(false);
      } else setIsViewButton(true);
    }
  }, [isMore, leagues]);

  return (
    <>
      {!isLoading && (
        <Leagues
          leaguesView={leaguesView}
          isViewButton={isViewButton}
          setIsMore={setIsMore}
        />
      )}
      {isLoading && <ScreenLoader />}
    </>
  );
};

export default LeaguesContainer;
