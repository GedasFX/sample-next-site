import HistoryTable from 'src/components/history/HistoryTable';
import { historySelectors, historyThunkActions } from 'src/store/history';
import { AppState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export type HistoryPageProps = {
  history: {
    product: {
      name: string;
    };
    store: {
      name: string;
      url: string;
    };
    date_created: string;
  }[];
};

export default function HistoryPage() {
  const historyState = useSelector((state: AppState) => state.history);
  const history = historySelectors.selectAll(historyState);

  const dispatch = useDispatch();

  useEffect(() => {
    // Only get data if we haven't already. In our case it cannot go out of date.
    if (!(historyState.lastSyncTimestamp && historyState.lastSyncTimestamp > 0)) {
      dispatch(historyThunkActions.fetchAll());
    }
  }, [dispatch, historyState.lastSyncTimestamp]);

  return (
    <div className="container mx-auto pt-12">
      <div className="mx-1">
        <HistoryTable data={history} />
      </div>
    </div>
  );
}
