import React from 'react';
import { ViewHeroState } from 'src/pages/ViewHero/ViewHeroContainer';
import PageTitle from 'src/components/PageTitle/PageTitle';
import styles from './ViewHero.styl';
import ViewHeroStats from 'src/pages/ViewHero/ViewHeroStats/ViewHeroStats';
import ViewHeroItems from 'src/pages/ViewHero/ViewHeroItems/ViewHeroItems';

interface IComponentProps {
  hero: ViewHeroState;
}

const ViewHero: React.FC<IComponentProps> = ({ hero }) => {
  return (
    <div className={styles.container}>
      <PageTitle text={hero.stats.localized_name} />
      <div className={styles.sections}>
        <ViewHeroStats hero={hero} />
        <ViewHeroItems hero={hero} />
      </div>
    </div>
  );
};

export default ViewHero;
