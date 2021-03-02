import { useMemo } from 'react';
import { Column, Row } from 'react-table';
import Table from '../common/Table';

export type HistoryTableProps = {
  data: Dto.Product[];
};

export default function HistoryTable({ data }: HistoryTableProps) {
  const columns: Column<Dto.Product>[] = useMemo(
    () => [
      {
        Header: 'Product',
        id: 'product.name',
        accessor: c => c.product.name,
      },
      {
        Header: 'Store',
        id: 'store.name',
        accessor: c => c.store.name,

        Cell: function Cell({ row }: { row: Row<Dto.Product> }) {
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
