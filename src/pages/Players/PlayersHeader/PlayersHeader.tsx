import React from 'react';
import styles from './PlayersHeader.styl';
import cn from 'classnames';

const cx = cn.bind(styles);

const headerItems = ['Имя', 'Команда', 'Был в сети', 'Последняя игра'];

const PlayersHeader: React.FC = () => {
  return (
    <div className={styles.container}>
      {headerItems.map((itm, index) => (
        <div key={index} className={cx(styles.container__cell)}>
          {itm}
        </div>
      ))}
    </div>
  );
};

export default PlayersHeader;
