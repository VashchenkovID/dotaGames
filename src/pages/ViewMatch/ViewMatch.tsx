import React from 'react';
import { ProMatchFullModel } from 'src/api/models/ProMatchFullModel';
import PageTitle from 'src/components/PageTitle/PageTitle';
import ViewMatchHeader from 'src/pages/ViewMatch/ViewMatchHeader/ViewMatchHeader';
import styles from './ViewMatch.styl';
import { Button, IconButton } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import ViewMatchTeamTable from 'src/pages/ViewMatch/ViewMatchTeamTable/ViewMatchTeamTable';
import { WinnerSide } from 'src/components/WinnerBadge/WinnerBadge';
import SimpleBar from 'simplebar-react';

interface IComponentProps {
  match: ProMatchFullModel;
}

const ViewMatch: React.FC<IComponentProps> = ({ match }) => {
  return (
    <div className={styles.container}>
      <PageTitle
        className={styles.titleText}
        text={'Детальная информация матча'}
      />
      <ViewMatchHeader match={match} />
      <div className={styles.downloadBtn}>
        <a className={styles.link} href={match.replay_url}>
          <Button size={'small'} variant="contained" color="primary">
            <IconButton className={styles.download} size={'small'}>
              <CloudDownload /> &nbsp; Загрузить
            </IconButton>
          </Button>
        </a>
      </div>
      <SimpleBar style={{ maxHeight: 'calc(100vh - 420px)' }}>
        <div className={styles.tables}>
          <ViewMatchTeamTable
            players={match.players.filter((pl) => pl.isRadiant)}
            type={WinnerSide.RADIANT}
            team={match.radiant_team}
            isWin={match.radiant_win}
          />
          <ViewMatchTeamTable
            players={match.players.filter((pl) => !pl.isRadiant)}
            type={WinnerSide.DIRE}
            team={match.dire_team}
            isWin={!match.radiant_win}
          />
        </div>
      </SimpleBar>
    </div>
  );
};

export default ViewMatch;
