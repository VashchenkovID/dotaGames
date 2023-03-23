import React, { useRef } from 'react';
import { WinnerSide } from 'src/components/WinnerBadge/WinnerBadge';
import { TeamModel } from 'src/api/models/TeamModel';
import StatusTeamBadge, {
  GameWinner,
} from 'src/components/StatusTeamBadge/StatusTeamBadge';
import styles from './ViewMatchTeamTableHeader.styl';

interface IComponentProps {
  type: WinnerSide;
  team: TeamModel;
  isWin: boolean;
}

const ViewMatchTeamTableHeader: React.FC<IComponentProps> = ({
  type,
  team,
  isWin,
}) => {
  const subHeaderItems = [
    { id: 0, title: 'игрок', color: '' },
    { id: 1, title: 'lvl', color: '' },
    { id: 2, title: 'k', color: '#BBDD00' },
    { id: 3, title: 'd', color: '#FA7000' },
    { id: 4, title: 'a', color: '' },
    { id: 5, title: 'lh/dn', color: '' },
    { id: 6, title: 'net', color: '#EECD00' },
    { id: 7, title: 'GMP/XPM', color: '' },
    { id: 8, title: 'hd', color: '' },
    { id: 9, title: 'td', color: '' },
    { id: 10, title: 'hh', color: '' },
    { id: 11, title: 'Предметы / Бафы', color: '' },
  ];
  const subHeaderItemsPhone = [
    { id: 0, title: 'игрок', color: '' },
    { id: 1, title: 'lvl', color: '' },
    { id: 2, title: 'k', color: '#BBDD00' },
    { id: 3, title: 'd', color: '#FA7000' },
    { id: 4, title: 'a', color: '' },
    { id: 5, title: 'lh/dn', color: '' },
    { id: 11, title: 'Предметы / Бафы', color: '' },
  ];

  const width = window.innerWidth;

  return (
    <div className={styles.allContainer}>
      <div className={styles.container}>
        <div>{type}</div>
        <div className={styles.team}>
          <img className={styles.img} alt={'err'} src={team.logo_url} />
          <span>{team.name}</span>
        </div>
        <StatusTeamBadge type={isWin ? GameWinner.WIN : GameWinner.LOOSE} />
      </div>
      <div className={styles.subContainer}>
        {width && width > 1450
          ? subHeaderItems.map((item, index) => (
              <div
                key={`${index}_${item.id}`}
                className={styles.subContainer__cell}
                style={{
                  color: item.color,
                  textAlign:
                    index !== 0 && index !== subHeaderItems.length - 1
                      ? 'center'
                      : undefined,
                }}
              >
                {item.title}
              </div>
            ))
          : subHeaderItemsPhone.map((item, index) => (
              <div
                key={`${index}_${item.id}`}
                className={styles.subContainer__cell}
                style={{
                  color: item.color,
                  textAlign:
                    index !== 0 && index !== subHeaderItemsPhone.length - 1
                      ? 'center'
                      : undefined,
                }}
              >
                {item.title}
              </div>
            ))}
      </div>
    </div>
  );
};

export default ViewMatchTeamTableHeader;
