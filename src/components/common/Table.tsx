// react-table typescript support is incredibly lacking. TODO: investigate alternatives. For now, brute force.
// eslint-disable-next-line
// @ts-nocheck

import { useMemo } from 'react';
import { Column, FilterProps, useFilters, useTable } from 'react-table';

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }: FilterProps) {
  return (
    <input
      className="block w-full p-1 border border-gray-300 rounded-sm"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${preFilteredRows.length} records...`}
    />
  );
}

export type HistoryTableProps = {
  // eslint-disable-next-line
  columns: Column<any>[];
  data: unknown[];
};

export default function Table({ columns, data }: HistoryTableProps) {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters
  );

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-sm">
        <table className="min-w-full leading-normal" {...getTableProps()}>
          <thead className="border-b border-gray-600">
            {headerGroups.map(g => (
              // eslint-disable-next-line react/jsx-key
              <tr {...g.getHeaderGroupProps()}>
                {g.headers.map(c => (
                  // eslint-disable-next-line react/jsx-key
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold uppercase tracking-wider"
                    {...c.getHeaderProps()}
                  >
                    {c.render('Header')}
                    {c.canFilter && <div className="mt-2">{c.render('Filter')}</div>}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm" {...getTableBodyProps()}>
            {rows.map(r => {
              prepareRow(r);

              return (
                // eslint-disable-next-line react/jsx-key
                <tr className="border-b border-gray-200 hover:bg-gray-50" {...r.getRowProps()}>
                  {r.cells.map(c => (
                    // eslint-disable-next-line react/jsx-key
                    <td className="px-5 py-1" {...c.getCellProps()}>
                      {c.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
