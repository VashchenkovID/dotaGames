  import React, { useEffect, useState } from 'react';
import {
  TeamByIdHeroesModel,
  TeamByIdMatchesModel,
  TeamByIdModel,
  TeamByIdPlayersModel,
} from 'src/api/models/TeamByIdModel';
import teamsApi from 'src/api/requests/teamsApi';
import { useParams } from 'react-router-dom';
import ViewTeam from 'src/pages/ViewTeam/ViewTeam';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';

export interface ViewTeamStateType {
  team: TeamByIdModel | null;
  heroes: TeamByIdHeroesModel[];
  matches: TeamByIdMatchesModel[];
  players: TeamByIdPlayersModel[];
}

const ViewTeamContainer: React.FC = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState<ViewTeamStateType>({
    team: null,
    heroes: [],
    matches: [],
    players: [],
  });
  //Начальная отрисовка
  const [teamView, setTeamView] = useState<ViewTeamStateType>({
    team: null,
    heroes: [],
    matches: [],
    players: [],
  });

  const fetchTeamInfo = async () => {
    if (params.id) {
      setIsLoading(true);
      const fetchArr = [
        await teamsApi.fetchTeamById(params.id).then((r) => {
          setTeam((prevState) => {
            return { ...prevState, team: r };
          });
          setTeamView((prevState) => {
            return { ...prevState, team: r };
          });
        }),
        await teamsApi.fetchTeamByIdPlayers(params.id).then((r) => {
          setTeam((prevState) => {
            return {
              ...prevState,
              players: r.filter((r) => r.name && r.is_current_team_member),
            };
          });
          setTeamView((prevState) => {
            return {
              ...prevState,
              players: r.filter((r) => r.name && r.is_current_team_member),
            };
          });
        }),
        await teamsApi.fetchTeamByIdHeroes(params.id).then((r) => {
          setTeam((prevState) => {
            return {
              ...prevState,
              heroes: r.sort((a, b) =>
                a.localized_name.localeCompare(b.localized_name),
              ),
            };
          });
          setTeamView((prevState) => {
            return {
              ...prevState,
              heroes: r
                .sort((a, b) =>
                  a.localized_name.localeCompare(b.localized_name),
                )
                .slice(0, 10),
            };
          });
        }),
        await teamsApi.fetchTeamByIdMatches(params.id).then((r) => {
          setTeam((prevState) => {
            return { ...prevState, matches: r };
          });
          setTeamView((prevState) => {
            return { ...prevState, matches: r.slice(0, 10) };
          });
        }),
      ];
      return Promise.allSettled(fetchArr).then(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchTeamInfo();
    }
  }, [params]);
  return (
    <>
      {!isLoading && team.team && (
        <ViewTeam teamView={teamView} team={team} setTeamView={setTeamView} />
      )}
      {isLoading && <ScreenLoader />}
    </>
  );
};

export default ViewTeamContainer;
