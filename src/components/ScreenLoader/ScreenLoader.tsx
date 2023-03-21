import React from 'react';
import style from './ScreenLoader.styl';
import { CircularProgress } from '@material-ui/core';

const ScreenLoader: React.FC = () => {
  return (
    <div className={style.loader}>
      <CircularProgress />
    </div>
  );
};

export default ScreenLoader;
