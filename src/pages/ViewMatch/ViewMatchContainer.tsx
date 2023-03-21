import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useRequest from 'src/hooks/useRequest';
import MatchesApi from 'src/api/requests/matchesApi';
import { ProMatchFullModel } from 'src/api/models/ProMatchFullModel';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import ViewMatch from 'src/pages/ViewMatch/ViewMatch';

const ViewMatchContainer: React.FC = () => {
  const params = useParams();
  const [match, setMatch] = useState<ProMatchFullModel | null>(null);
  const { load: fetchFullMatch, isLoading } = useRequest(
    MatchesApi.fetchFullProMatch,
    (data) => {
      if (data) {
        setMatch(data);
      }
    },
  );

  useEffect(() => {
    if (params.id) {
      fetchFullMatch(params.id);
    }
  }, [params]);
  return (
    <div>
      {isLoading && <ScreenLoader />}
      {!isLoading && match && <ViewMatch match={match} />}
    </div>
  );
};

export default ViewMatchContainer;
