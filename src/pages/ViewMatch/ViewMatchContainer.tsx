import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRequest from 'src/hooks/useRequest';
import MatchesApi from 'src/api/requests/matchesApi';
import { ProMatchFullModel } from 'src/api/models/ProMatchFullModel';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import ViewMatch from 'src/pages/ViewMatch/ViewMatch';
import { useResize } from 'src/hooks/useResize';
import SimpleBar from 'simplebar-react';

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
  const { width } = useResize();
  return (
    <div>
      {isLoading && <ScreenLoader />}
      {!isLoading && match && width > 1030 && <ViewMatch match={match} />}
      {!isLoading && match && width <= 1030 && (
        <SimpleBar style={{ maxHeight: 'calc(100vh - 100px)' }}>
          <ViewMatch match={match} />
        </SimpleBar>
      )}
    </div>
  );
};

export default ViewMatchContainer;
