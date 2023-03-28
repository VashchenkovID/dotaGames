import React from 'react';
import styles from './HeroesSection.styl';
import HeroesCell from 'src/pages/Heroes/HeroesCell/HeroesCell';
import { HeroesCellModel } from 'src/pages/Heroes/HeroesContainer';
import { PrimaryAttrs } from 'src/utils/enum';

interface IComponentProps {
  heroes: HeroesCellModel[];
  title: PrimaryAttrs;
}
enum ruPrimaryAttr {
  agi = 'Ловкость',
  int = 'Интеллект',
  str = 'Сила',
}

const HeroesSection: React.FC<IComponentProps> = ({ heroes, title }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{ruPrimaryAttr[title]}</span>
      <div className={styles.items}>
        {heroes.length > 0 &&
          heroes.map((hero, index) => <HeroesCell hero={hero} key={index} />)}
      </div>
    </div>
  );
};

export default HeroesSection;
