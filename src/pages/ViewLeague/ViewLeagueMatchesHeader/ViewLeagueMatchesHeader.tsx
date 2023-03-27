import React from 'react';
import styles from './ViewLeagueMatchesHeader.styl';
import cn from 'classnames/bind';
const headerItems = ['Id', 'Продолжительность', 'Счет'];
const cx = cn.bind(styles);
const ViewLeagueMatchesHeader: React.FC = () => {
  return (
    <ul className={styles.container}>
      {headerItems.map((item, index) => (
        <li
          className={cx(styles.cell, {
            center: index !== 0,
          })}
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ViewLeagueMatchesHeader;
