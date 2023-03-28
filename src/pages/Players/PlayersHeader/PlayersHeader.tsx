import React from 'react';
import styles from './PlayersHeader.styl';
import cn from 'classnames';
import { useResize } from 'src/hooks/useResize';

const cx = cn.bind(styles);

const headerItems = ['Имя', 'Команда', 'Был в сети', 'Последняя игра'];

const PlayersHeader: React.FC = () => {
  const { width } = useResize();
  return (
    <div className={styles.container}>
      {headerItems.map((itm, index) => (
        <div
          key={index}
          className={cx(styles.cell, {
            center: index === 0 && width <= 1030,
          })}
        >
          {itm}
        </div>
      ))}
    </div>
  );
};

export default PlayersHeader;
