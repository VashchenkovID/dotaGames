import React from 'react';
import { ItemModel } from 'src/api/models/ItemModel';
import styles from 'src/pages/ViewHero/ViewHeroItems/ViewHeroItems.styl';
import ViewHeroItemsCell from 'src/pages/ViewHero/ViewHeroItemsCell/ViewHeroItemsCell';

interface IComponentProps {
  items: ItemModel[];
  title: string;
}

const ViewHeroItemsRow: React.FC<IComponentProps> = ({ items, title }) => {
  return (
    <div>
      <h2 className={styles.subTitle}>{title}</h2>
      <div className={styles.itemRow}>
        {items.map((item, index) => (
          <ViewHeroItemsCell key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ViewHeroItemsRow;
