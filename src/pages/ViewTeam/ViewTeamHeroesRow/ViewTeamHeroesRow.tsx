import React, { useMemo } from 'react';
import { TeamByIdHeroesModel } from 'src/api/models/TeamByIdModel';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectInitHeroes } from 'src/redux/features/init/InitSelectors';
import styles from './ViewTeamHeroesRow.styl';
interface IComponentProps {
  hero: TeamByIdHeroesModel;
}

const ViewTeamHeroesRow: React.FC<IComponentProps> = ({ hero }) => {
  const heroes = useAppSelector(selectInitHeroes);
  const url = process.env.REACT_APP_API_URL_IMAGE;
  const baseHero: any = useMemo(() => {
    if (hero && heroes) {
      return Object.values(heroes).find((h: any) => hero.hero_id === h?.id);
    } else return undefined;
  }, [heroes]);
  console.log(hero);
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <img className={styles.img} src={`${url}${baseHero?.img}`} />
        <span>{hero.localized_name}</span>
      </div>
      <div className={styles.cell}>{hero.games_played}</div>
      <div className={styles.cell}>{hero.wins}</div>
    </div>
  );
};

export default ViewTeamHeroesRow;
