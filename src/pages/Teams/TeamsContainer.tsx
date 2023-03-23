import React, { useEffect, useState } from 'react';
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
      {!isLoading && (
        <Teams
          viewTeams={viewTeams}
          isViewButton={isViewButton}
          setIsMore={setIsMore}
        />
      )}
    </div>
  );
};

export default TeamsContainer;
