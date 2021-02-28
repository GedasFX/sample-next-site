import { useMemo } from 'react';
import { Column, Row } from 'react-table';
import Table from '../common/Table';

type DataRow = {
  product: {
    name: string;
  };
  store: {
    name: string;
    url: string;
  };
  date_created: string;
};

export type HistoryTableProps = {
  data: DataRow[];
};

export default function HistoryTable({ data }: HistoryTableProps) {
  const columns: Column<DataRow>[] = useMemo(
    () => [
      {
        Header: 'Product',
        accessor: 'product.name' as 'product',
      },
      {
        Header: 'Store',
        accessor: 'store.name' as 'store',

        Cell: function Cell({ row }: { row: Row<DataRow> }) {
          return (
            <a
              className="hover:underline"
              href={row.original.store.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {row.original.store.name}
            </a>
          );
        },
      },
      {
        Header: 'Date',
        accessor: 'date_created',

        Cell: function Cell({ value }) {
          return new Date(value).toLocaleString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',

            hour12: false,
            timeZoneName: 'short',
          });
        },
      },
    ],
    []
  );
  return <Table data={data} columns={columns} />;
}
