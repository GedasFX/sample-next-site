// react-table typescript support is incredibly lacking. TODO: investigate alternatives.
// eslint-disable-next-line
// @ts-nocheck

import { useMemo, useState } from 'react';
import { Column, FilterProps, Row, useFilters, useGlobalFilter, useTable } from 'react-table';

function DefaultColumnFilter({ column: { filterValue, setFilter } }: FilterProps<DataRow>) {
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder="Search records..."
    />
  );
}

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
  //   const columns: Column<DataRow>[] = useMemo(
  //     () => [
  //       {
  //         Header: 'Product',
  //         accessor: 'product.name' as 'product',
  //       },
  //       {
  //         Header: 'Store',
  //         accessor: 'store.name' as 'store',

  //         Cell: function Cell({ row }: { row: Row<DataRow> }) {
  //           return (
  //             <a href={row.original.store.url} target="_blank" rel="noopener noreferrer">
  //               {row.original.store.name}
  //             </a>
  //           );
  //         },
  //       },
  //       {
  //         Header: 'Date',
  //         accessor: 'date_created',

  //         Cell: function Cell({ value }) {
  //           return new Date(value).toLocaleString(undefined, {
  //             weekday: 'short',
  //             year: 'numeric',
  //             month: 'long',
  //             day: '2-digit',
  //             hour: '2-digit',
  //             minute: '2-digit',

  //             hour12: false,
  //             timeZoneName: 'short',
  //           });
  //         },
  //       },
  //     ],
  //     []
  //   );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: [data[0]],
      defaultColumn,
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(g => (
          // eslint-disable-next-line react/jsx-key
          <tr {...g.getHeaderGroupProps()}>
            {g.headers.map(c => (
              // eslint-disable-next-line react/jsx-key
              <th {...c.getHeaderProps()}>
                {c.render('Header')}
                {c.canFilter && c.render('Filter')}
              </th>
            ))}
          </tr>
        ))}
        <tr>
          <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
        </tr>
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
