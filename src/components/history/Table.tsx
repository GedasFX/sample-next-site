// react-table typescript support is incredibly lacking. TODO: investigate alternatives.
// eslint-disable-next-line
// @ts-nocheck

import { useTable, useFilters, useGlobalFilter, Column } from 'react-table';
import React from 'react';

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: FilterProps<DataRow>) {
  const count = preFilteredRows.length;

  return (
    <input
      className="form-control"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function Table({ columns, data }: { columns: Column<{}>; data: {}[] }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <div>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  // eslint-disable-next-line react/jsx-key
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}

function FilterTableComponent() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  );

  const data = [
    {
      firstName: 'horn-od926',
      lastName: 'selection-gsykp',
      age: 22,
      visits: 20,
      progress: 39,
      status: 'single',
    },
    {
      firstName: 'heart-nff6w',
      lastName: 'information-nyp92',
      age: 16,
      visits: 98,
      progress: 40,
      status: 'complicated',
    },
    {
      firstName: 'minute-yri12',
      lastName: 'fairies-iutct',
      age: 7,
      visits: 77,
      progress: 39,
      status: 'single',
    },
    {
      firstName: 'degree-jx4h0',
      lastName: 'man-u2y40',
      age: 27,
      visits: 54,
      progress: 92,
      status: 'relationship',
    },
  ];

  return <Table columns={columns} data={data} />;
}

export default FilterTableComponent;
