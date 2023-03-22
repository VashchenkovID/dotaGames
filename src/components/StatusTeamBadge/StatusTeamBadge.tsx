import React from 'react';
import cn from 'classnames/bind';
import styles from './StatusTeamBadge.styl';

export enum GameWinner {
  WIN = 'win',
  LOOSE = 'loose',
}

interface IComponentProps {
  type: GameWinner;
}

const cx = cn.bind(styles);

const StatusTeamBadge: React.FC<IComponentProps> = ({ type }) => {
  return (
    <div
      className={cx(styles.container, {
        win: type === GameWinner.WIN,
        loose: type === GameWinner.LOOSE,
      })}
    >
      {type === GameWinner.WIN ? 'Победители' : 'Проигравшие'}
    </div>
  );
};

export default StatusTeamBadge;
