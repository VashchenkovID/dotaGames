import React, { useEffect, useMemo, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import teamsApi from 'src/api/requests/teamsApi';
import { TeamFullModel } from 'src/api/models/TeamModel';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import Teams from 'src/pages/Teams/Teams';

const TeamsContainer: React.FC = () => {
  //Все команды
  const [teams, setTeams] = useState<TeamFullModel[]>([]);
  //Отображаемые команды
  const [viewTeams, setViewTeams] = useState<TeamFullModel[]>([]);
  //Подгрузка матчей (на api нет пагинации)
  const [isMore, setIsMore] = useState(1);
  const [isViewButton, setIsViewButton] = useState(true);
  //Request
  const { load: fetchTeamsList, isLoading } = useRequest(
    teamsApi.fetchTeams,
    (data) => {
      if (data) {
        setTeams(data);
        setViewTeams(data.slice(0, 10));
      }
    },
  );

  const maxParams = useMemo(() => {
    if (teams && teams.length > 0) {
      return {
        maxRating: teams
          .map((team) => team.rating)
          .reduce((x, y) => Math.max(x, y)),
        maxWins: teams
          .map((team) => team.wins)
          .reduce((x, y) => Math.max(x, y)),
        maxLosses: teams
          .map((team) => team.losses)
          .reduce((x, y) => Math.max(x, y)),
      };
    } else
      return {
        maxRating: 0,
        maxWins: 0,
        maxLosses: 0,
      };
  }, [teams]);

  useEffect(() => {
    fetchTeamsList();
  }, []);

  useEffect(() => {
    if (isMore) {
      setViewTeams(teams.slice(0, 10 * isMore));
      if (isMore > teams.length / 10) {
        setIsViewButton(false);
      } else setIsViewButton(true);
    }
  }, [isMore, teams]);
  return (
    <div>
      {isLoading && <ScreenLoader />}
      {!isLoading && viewTeams.length > 0 && (
        <Teams
          viewTeams={viewTeams}
          isViewButton={isViewButton}
          setIsMore={setIsMore}
          maxParams={maxParams}
        />
      )}
    </div>
  );
};

export default TeamsContainer;
