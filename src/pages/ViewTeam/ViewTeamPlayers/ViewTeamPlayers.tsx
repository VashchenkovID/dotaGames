import React from 'react';
import styles from './ViewTeamPlayers.styl';
import { TeamByIdPlayersModel } from 'src/api/models/TeamByIdModel';

interface IComponentProps {
  players: TeamByIdPlayersModel[];
}

const ViewTeamPlayers: React.FC<IComponentProps> = ({ players }) => {
  return (
    <div className={styles.container}>
      <span className={styles.container__title}>Участники</span>
      <div>
        <div className={styles.container__header}>
          <div>Никнейм</div>
          <div className={styles.container__row__cell}>Побед</div>
          <div className={styles.container__row__cell}>Всего игр</div>
        </div>
        <div className={styles.container__rows}>
          {players.length > 0 &&
            players.map((player, index) => (
              <div
                key={`${player.account_id}_${index}`}
                className={styles.container__row}
              >
                <div className={styles.container__row__nick}>{player.name}</div>
                <div className={styles.container__row__cell}>{player.wins}</div>
                <div className={styles.container__row__cell}>
                  {player.games_played}
                </div>
              </div>
            ))}
          {players.length === 0 && <span>Действующих игроков нет</span>}
        </div>
      </div>
    </div>
  );
};

export default ViewTeamPlayers;
