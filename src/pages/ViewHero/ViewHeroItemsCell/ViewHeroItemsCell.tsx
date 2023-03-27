import React from 'react';
import { ItemModel } from 'src/api/models/ItemModel';
import styles from './ViewHeroItemsCell.styl';

interface IComponentProps {
  item: ItemModel;
}

const ViewHeroItemsCell: React.FC<IComponentProps> = ({ item }) => {
  const url = process.env.REACT_APP_API_URL_IMAGE;
  return (
    <div className={styles.container}>
      <img src={`${url}${item?.img}`} />
      <span>{item?.dname}</span>
    </div>
  );
};

export default ViewHeroItemsCell;
