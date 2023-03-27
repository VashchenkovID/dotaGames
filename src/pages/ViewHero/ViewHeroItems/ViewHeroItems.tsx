import React from 'react';
import { ViewHeroState } from 'src/pages/ViewHero/ViewHeroContainer';
import styles from './ViewHeroItems.styl';
import SimpleBar from 'simplebar-react';
import ViewHeroItemsRow from 'src/pages/ViewHero/ViewHeroItemsRow/ViewHeroItemsRow';
interface IComponentProps {
  hero: ViewHeroState;
}

const ViewHeroItems: React.FC<IComponentProps> = ({ hero }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Рекомендуемые предметы</h1>
      <SimpleBar style={{ maxHeight: 'calc(100vh - 320px)', maxWidth: 'auto' }}>
        <section>
          <ViewHeroItemsRow
            items={hero.items?.start_game_items
              ?.filter(function (value, index, self) {
                return self.indexOf(value) === index;
              })
              ?.filter((i) => i !== undefined)}
            title={'Старт игры'}
          />
          <ViewHeroItemsRow
            items={hero.items?.early_game_items
              ?.filter(function (value, index, self) {
                return self.indexOf(value) === index;
              })
              ?.filter((i) => i !== undefined)}
            title={'Начало игры'}
          />
          <ViewHeroItemsRow
            items={hero.items?.mid_game_items
              ?.filter(function (value, index, self) {
                return self.indexOf(value) === index;
              })
              ?.filter((i) => i !== undefined)}
            title={'Середина игры'}
          />
          <ViewHeroItemsRow
            items={hero.items?.late_game_items
              ?.filter(function (value, index, self) {
                return self.indexOf(value) === index;
              })
              ?.filter((i) => i !== undefined)}
            title={'Конец игры'}
          />
        </section>
      </SimpleBar>
    </div>
  );
};

export default ViewHeroItems;
