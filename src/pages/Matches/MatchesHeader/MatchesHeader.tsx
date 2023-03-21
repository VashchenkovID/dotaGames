import React from 'react';
import styles from './MatchesHeader.styl';
import cn from 'classnames/bind';

const headerItems = [
  { id: 0, name: 'id', isCenter: false },
  { id: 1, name: 'длительность', isCenter: true },
  { id: 2, name: 'Команда света', isCenter: true },
  { id: 3, name: 'Команда тьмы', isCenter: true },
];

const cx = cn.bind(styles);

const MatchesHeader: React.FC = () => {
  return (
    <div className={styles.container}>
      {headerItems.map((itm) => (
        <div
          key={itm.id}
          className={cx(styles.container__cell, {
            center: itm.isCenter,
          })}
        >
          {itm.name}
        </div>
      ))}
    </div>
  );
};

export default MatchesHeader;
