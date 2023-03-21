import React from 'react';
import styles from './WinnerBadge.styl';
import cn from 'classnames/bind';
import TeamIcon from 'src/components/DotaIcon/TeamIcon';

export enum WinnerSide {
  DIRE = 'Dire',
  RADIANT = 'Radiant',
}

interface IComponentProps {
  winner: WinnerSide;
}

const cx = cn.bind(styles);

const WinnerBadge: React.FC<IComponentProps> = ({ winner }) => {
  return (
    <div
      className={cx(styles.container, {
        dire: winner === WinnerSide.DIRE,
        radiant: winner === WinnerSide.RADIANT,
      })}
    >
      <TeamIcon />
      <span>Победа: {winner}</span>
    </div>
  );
};

export default WinnerBadge;
