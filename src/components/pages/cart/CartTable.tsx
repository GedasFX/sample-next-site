import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Column, Row } from 'react-table';
import Table from 'src/components/common/Table';
import { cartActions } from 'src/store/cart';

export type CartTableProps = {
  data: Dto.Product[];
};

export default function CartTable({ data }: CartTableProps) {
  const dispatch = useDispatch();

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
      {
        Header: 'Actions',
        id: 'edit',
        accessor: c => c.id,

        Cell: function Cell({ value }: { value: string | number }) {
          return <button onClick={() => dispatch(cartActions.remove(value))}>Delete</button>;
        },
      },
    ],
    [dispatch]
  );

  return <Table columns={columns} data={data} />;
}
