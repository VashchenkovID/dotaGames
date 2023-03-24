import React from 'react';
import styles from './LeaguesHeader.styl';

const headerItems = ['Наименование', 'Тир'];

const LeaguesHeader: React.FC = () => {
  return (
    <div className={styles.container}>
      {headerItems.map((itm, index) => (
        <div key={index} className={styles.container__cell}>
          {itm}
        </div>
      ))}
    </div>
  );
};

export default LeaguesHeader;
