import { useMemo } from 'react';
import { Column, Row, useTable } from 'react-table';

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

        // eslint-disable-next-line react/display-name
        Cell: ({ row }: { row: Row<DataRow> }) => (
          <a href={row.original.store.url} target="_blank" rel="noopener noreferrer">
            {row.original.store.name}
          </a>
        ),
      },
      {
        Header: 'Date',
        accessor: 'date_created',

        // eslint-disable-next-line react/display-name
        Cell: ({ value }) =>
          new Date(value).toLocaleString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',

            hour12: false,
            timeZoneName: 'short',
          }),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(g => (
          // eslint-disable-next-line react/jsx-key
          <tr {...g.getHeaderGroupProps()}>
            {g.headers.map(c => (
              // eslint-disable-next-line react/jsx-key
              <th {...c.getHeaderProps()}>{c.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(r => {
          prepareRow(r);

          return (
            // eslint-disable-next-line react/jsx-key
            <tr {...r.getRowProps()}>
              {r.cells.map(c => (
                // eslint-disable-next-line react/jsx-key
                <td {...c.getCellProps()}>{c.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
