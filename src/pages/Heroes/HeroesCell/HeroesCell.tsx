import React from 'react';
import { InitHeroModel } from 'src/api/models/InitHeroModel';
import styles from './HeroesCell.styl';
import { HeroesCellModel } from 'src/pages/Heroes/HeroesContainer';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';

interface IComponentProps {
  hero: HeroesCellModel;
}

const HeroesCell: React.FC<IComponentProps> = ({ hero }) => {
  const url = process.env.REACT_APP_API_URL_IMAGE;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${PublicRoutesEnum.HERO}/${hero.id}`)}
      className={styles.container}
    >
      <img className={styles.img} src={`${url}${hero.img}`} />
      <span>{hero.localized_name}</span>
    </div>
  );
};

export default HeroesCell;
