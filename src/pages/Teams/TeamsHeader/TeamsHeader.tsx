import React from 'react';
import styles from './TeamsHeader.styl';
import cn from 'classnames/bind';

const TeamsHeader: React.FC = () => {
  const headerItems = [
    'Ранг',
    'Название команды',
    'Рейтинг',
    'Победы',
    'Поражения',
  ];

  const cx = cn.bind(styles);

  return (
    <div className={styles.container}>
      {headerItems.map((item, index) => (
        <div className={cx(styles.container__cell)} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default TeamsHeader;
