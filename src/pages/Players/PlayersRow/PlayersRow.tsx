import React from 'react';
import { ProPlayerReqModel } from 'src/api/models/ProPlayerReqModel';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import styles from './PlayersRow.styl';
import cn from 'classnames/bind';
import { useResize } from 'src/hooks/useResize';

interface IComponentProps {
  player: ProPlayerReqModel;
}

const cx = cn.bind(styles);

const PlayersRow: React.FC<IComponentProps> = ({ player }) => {
  const navigate = useNavigate();
  const { width } = useResize();
  return (
    <div className={styles.container}>
      <div
        className={cx(styles.nameCell, {
          smallScreen: width <= 1030,
        })}
      >
        <img className={styles.img} src={player.avatarmedium} />
        <div className={styles.name}>{player.name}</div>
        <div className={styles.name}>{player.personaname}</div>
      </div>
      <div
        onClick={() => navigate(`${PublicRoutesEnum.TEAM}/${player.team_id}`)}
        className={styles.team}
      >
        {player.team_name} ({player.team_tag})
      </div>
      <div>
        {player.last_login
          ? new Date(player.last_login).toLocaleDateString()
          : '-'}
      </div>
      <div>
        {player.last_match_time
          ? new Date(player.last_match_time).toLocaleDateString()
          : '-'}
      </div>
    </div>
  );
};

export default PlayersRow;
