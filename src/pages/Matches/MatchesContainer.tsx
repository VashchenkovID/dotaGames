import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import matchesApi from 'src/api/requests/matchesApi';
import { ProMatchModel } from 'src/api/models/ProMatchModel';
import { CircularProgress } from '@material-ui/core';
import style from './Matches.styl';

const MatchesContainer: React.FC = () => {
  const [matches, setMatches] = useState<ProMatchModel[]>([]);
  const { load: fetchDotaMatches, isLoading } = useRequest(
    matchesApi.fetchProMatches,
    (data) => {
      if (data) {
        setMatches(data);
      }
    },
  );
  useEffect(() => {
    fetchDotaMatches();
  }, []);

  return (
    <div>
      {isLoading && (
        <div className={style.loader}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default MatchesContainer;
