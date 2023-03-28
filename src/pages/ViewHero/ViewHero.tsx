import React from 'react';
import { ViewHeroState } from 'src/pages/ViewHero/ViewHeroContainer';
import PageTitle from 'src/components/PageTitle/PageTitle';
import styles from './ViewHero.styl';
import ViewHeroStats from 'src/pages/ViewHero/ViewHeroStats/ViewHeroStats';
import ViewHeroItems from 'src/pages/ViewHero/ViewHeroItems/ViewHeroItems';
import { useResize } from 'src/hooks/useResize';
import SimpleBar from 'simplebar-react';

interface IComponentProps {
  hero: ViewHeroState;
}

const ViewHero: React.FC<IComponentProps> = ({ hero }) => {
  const { width } = useResize();
  return (
    <div className={styles.container}>
      <PageTitle text={hero.stats.localized_name} />
      {width <= 1030 ? (
        <SimpleBar className={styles.simpleBar}>
          {' '}
          <div className={styles.sections}>
            <ViewHeroStats hero={hero} />
            <ViewHeroItems hero={hero} />
          </div>
        </SimpleBar>
      ) : (
        <div className={styles.sections}>
          <ViewHeroStats hero={hero} />
          <ViewHeroItems hero={hero} />
        </div>
      )}
    </div>
  );
};

export default ViewHero;
