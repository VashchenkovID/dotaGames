import React, { useEffect, useState } from 'react';
import { TeamByIdMatchesModel } from 'src/api/models/TeamByIdModel';
import styles from './ViewTeamMatches.styl';
import ViewTeamMatchesRow from 'src/pages/ViewTeam/ViewTeamMatchesRow/ViewTeamMatchesRow';
import { Button } from '@material-ui/core';
import { ViewTeamStateType } from 'src/pages/ViewTeam/ViewTeamContainer';
import teams from 'src/pages/Teams/Teams';
import SimpleBar from 'simplebar-react';

interface IComponentProps {
  matches: TeamByIdMatchesModel[];
  team: ViewTeamStateType;
  setTeamView: React.Dispatch<React.SetStateAction<ViewTeamStateType>>;
}

const ViewTeamMatches: React.FC<IComponentProps> = ({
  team,
  matches,
  setTeamView,
}) => {
  //Подгрузка матчей (на api нет пагинации)
  const [isMore, setIsMore] = useState(1);
  const [isViewButton, setIsViewButton] = useState(true);

  useEffect(() => {
    if (isMore) {
      setTeamView((prevState) => {
        return { ...prevState, matches: team.matches.slice(0, 10 * isMore) };
      });
      if (isMore * 10 > team.matches.length) {
        setIsViewButton(false);
      } else setIsViewButton(true);
    }
  }, [isMore, teams]);
  return (
    <div className={styles.container}>
      <span className={styles.container__title}>Матчи</span>
      <div>
        <div className={styles.container__header}>
          <div>ID</div>
          <div className={styles.cell}>Статус</div>
          <div className={styles.cell}>Противник</div>
          <div className={styles.cell}>Счет</div>
        </div>
        <SimpleBar style={{ maxHeight: 'calc(100vh - 740px)' }}>
          <div className={styles.container__rows}>
            {matches.length > 0 &&
              matches.map((match, index) => (
                <ViewTeamMatchesRow
                  match={match}
                  key={`${match.match_id}_${index}`}
                />
              ))}
            {matches.length === 0 && <span>История пуста</span>}
          </div>
        </SimpleBar>
        {isViewButton && (
          <article className={styles.button}>
            <Button
              variant="contained"
              color="primary"
              size={'small'}
              onClick={() => {
                setIsMore((prevState) => prevState + 1);
              }}
            >
              Загрузить еще
            </Button>
          </article>
        )}
      </div>
    </div>
  );
};

export default ViewTeamMatches;
