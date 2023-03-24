import React from 'react';
import { LeagueModelReq } from 'src/api/models/LeagueModelReq';
import styles from './LeaguesRow.styl';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';

interface IComponentProps {
  item: LeagueModelReq;
}

const LeaguesRow: React.FC<IComponentProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`${PublicRoutesEnum.LEAGUE}/${item.leagueid}`);
      }}
      className={styles.container}
    >
      <div className={styles.name}>{item.name}</div>
      <div className={styles.tier}>{item.tier}</div>
    </div>
  );
};

export default LeaguesRow;
