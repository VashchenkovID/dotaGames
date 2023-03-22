import React from 'react';
import { PlayerModel } from 'src/api/models/PlayerModel';
import { WinnerSide } from 'src/components/WinnerBadge/WinnerBadge';
import { TeamModel } from 'src/api/models/TeamModel';
import ViewMatchTeamTableHeader from 'src/pages/ViewMatch/ViewMatchTeamTableHeader/ViewMatchTeamTableHeader';
import ViewMatchTeamTableRow from 'src/pages/ViewMatch/ViewMatchTeamTableRow/ViewMatchTeamTableRow';
import styles from './ViewMatchTeamTable.styl';

interface IComponentProps {
  players: PlayerModel[];
  type: WinnerSide;
  team: TeamModel;
  isWin: boolean;
}

const ViewMatchTeamTable: React.FC<IComponentProps> = ({
  players,
  type,
  team,
  isWin,
}) => {
  return (
    <div className={styles.container}>
      <ViewMatchTeamTableHeader type={type} team={team} isWin={isWin} />
      <section className={styles.rows}>
        {players &&
          players.length > 0 &&
          players.map((player, index) => (
            <ViewMatchTeamTableRow player={player} key={index} />
          ))}
      </section>
    </div>
  );
};

export default ViewMatchTeamTable;
