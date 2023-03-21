import React from 'react';
import { ProMatchFullModel } from 'src/api/models/ProMatchFullModel';
import PageTitle from 'src/components/PageTitle/PageTitle';
import ViewMatchHeader from 'src/pages/ViewMatch/ViewMatchHeader/ViewMatchHeader';
import styles from './ViewMatch.styl';
import { Button, IconButton } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

interface IComponentProps {
  match: ProMatchFullModel;
}

const ViewMatch: React.FC<IComponentProps> = ({ match }) => {
  return (
    <div className={styles.container}>
      <PageTitle text={'Детальная информация матча'} />
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
    </div>
  );
};

export default ViewMatch;
