import React, { useEffect, useState } from 'react';
import { TeamByIdHeroesModel } from 'src/api/models/TeamByIdModel';
import { ViewTeamStateType } from 'src/pages/ViewTeam/ViewTeamContainer';
import teams from 'src/pages/Teams/Teams';
import styles from './ViewTeamHeroes.styl';
import SimpleBar from 'simplebar-react';
import { Button } from '@material-ui/core';
import ViewTeamHeroesRow from 'src/pages/ViewTeam/ViewTeamHeroesRow/ViewTeamHeroesRow';
import {
  SortByAlpha,
  SortByAlphaSharp,
  SortOutlined,
  SortRounded,
  SortSharp,
} from '@material-ui/icons';

interface IComponentProps {
  heroes: TeamByIdHeroesModel[];
  team: ViewTeamStateType;
  setTeamView: React.Dispatch<React.SetStateAction<ViewTeamStateType>>;
}

const ViewTeamHeroes: React.FC<IComponentProps> = ({
  heroes,
  team,
  setTeamView,
}) => {
  //Подгрузка матчей (на api нет пагинации)
  const [isMore, setIsMore] = useState(1);
  const [isViewButton, setIsViewButton] = useState(true);
  //Сортировка
  const [sort, setSort] = useState(false);

  useEffect(() => {
    if (isMore) {
      setTeamView((prevState) => {
        return { ...prevState, heroes: team.heroes.slice(0, 10 * isMore) };
      });
      if (isMore * 10 > team.heroes.length) {
        setIsViewButton(false);
      } else setIsViewButton(true);
    }
  }, [isMore, teams]);
  useEffect(() => {
    if (sort) {
      setTeamView((prevState) => {
        return {
          ...prevState,
          heroes: team.heroes
            .sort((a, b) => b.localized_name.localeCompare(a.localized_name))
            .slice(0, 10 * isMore),
        };
      });
    } else {
      setTeamView((prevState) => {
        return {
          ...prevState,
          heroes: team.heroes
            .sort((a, b) => a.localized_name.localeCompare(b.localized_name))
            .slice(0, 10 * isMore),
        };
      });
    }
  }, [sort]);
  return (
    <div className={styles.container}>
      <span className={styles.container__title}>Рейтинг героев</span>
      <div>
        <div className={styles.container__header}>
          <div className={styles.nameCell}>
            Герой{' '}
            <SortOutlined
              onClick={() => {
                setSort(!sort);
              }}
              color={sort ? 'primary' : undefined}
              className={styles.sort}
              fontSize="small"
            />
          </div>
          <div className={styles.cell}>Игр</div>
          <div className={styles.cell}>Побед</div>
        </div>
        <SimpleBar style={{ maxHeight: 'calc(100vh - 753px)' }}>
          <div className={styles.container__rows}>
            {heroes.length > 0 &&
              heroes.map((hero, index) => (
                <ViewTeamHeroesRow
                  hero={hero}
                  key={`${hero.hero_id}_${index}`}
                />
              ))}
            {heroes.length === 0 && <span>История пуста</span>}
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

export default ViewTeamHeroes;
