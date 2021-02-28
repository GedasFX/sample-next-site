import { GetStaticProps } from 'next';
import * as fs from 'fs';
import HistoryTable from 'src/components/history/HistoryTable';

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

export default function HistoryPage({ history }: HistoryPageProps) {
  return (
    <div className="pt-5">
      <HistoryTable data={history} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<HistoryPageProps> = async () => {
  const { history }: typeof import('_data.json') = JSON.parse(
    fs.readFileSync('_data.json', 'utf-8')
  );

  return { props: { history } };
};
