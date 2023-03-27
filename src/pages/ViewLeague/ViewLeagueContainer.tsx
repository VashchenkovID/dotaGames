import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import leaguesApi from 'src/api/requests/leaguesApi';
import { LeagueModelReq } from 'src/api/models/LeagueModelReq';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import { TeamFullModel } from 'src/api/models/TeamModel';
import ViewLeague from 'src/pages/ViewLeague/ViewLeague';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';

export interface ViewLeagueState {
  league: LeagueModelReq | null;
  matches: ProMatchModel[];
  teams: TeamFullModel[];
}

const ViewLeagueContainer: React.FC = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [league, setLeague] = useState<ViewLeagueState>({
    league: null,
    matches: [],
    teams: [],
  });
  const fetchFullInfo = async () => {
    if (params) {
      setIsLoading(true);
      await leaguesApi
        .fetchLeague(Number(params.id))
        .then((r) => {
          if (r) {
            setLeague((prevState) => {
              return { ...prevState, league: r };
            });
          }
        })
        .then(async () => {
          await leaguesApi.fetchLeagueMatches(Number(params.id)).then((r) => {
            setLeague((prevState) => {
              return { ...prevState, matches: r };
            });
          });
        })
        .then(async () => {
          await leaguesApi.fetchLeagueTeams(Number(params.id)).then((r) => {
            if (r)
              setLeague((prevState) => {
                return { ...prevState, teams: r };
              });
          });
        })
        .then(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (params) {
      fetchFullInfo();
    }
  }, [params]);
  return (
    <>
      {isLoading && <ScreenLoader />}
      {!isLoading && league.league && <ViewLeague league={league} />}
    </>
  );
};

export default ViewLeagueContainer;
