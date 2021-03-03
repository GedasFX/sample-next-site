import { GetStaticProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import CartTable from 'src/components/pages/cart/CartTable';
import Market from 'src/components/pages/cart/Market';
import { AppState } from 'src/store';
import { cartActions, cartSelectors } from 'src/store/cart';
import { historyActions } from 'src/store/history';
import { v4 as uuid } from 'uuid';

type CartPageProps = {
  products: { name: string }[];
  store: {
    name: string;
    url?: string;
  };
};

export default function CartPage({ products, store }: CartPageProps) {
  const dispatch = useDispatch();

  const cartState = useSelector((state: AppState) => state.cart);
  const cart = cartSelectors.selectAll(cartState);

  return (
    <div className="container mx-auto pt-5">
      <Market
        items={products}
        store={store}
        onItemClick={product => {
          dispatch(
            cartActions.add({
              id: uuid(),
              date_created: new Date().toISOString(),
              product,
              store: {
                name: store.name,
                url: store.url || window.location.origin,
              },
            })
          );
        }}
      />
      <CartTable data={cart} />
      <button
        className="text-white text-lg bg-indigo-500 hover:bg-indigo-600 rounded py-2 px-8 float-right"
        onClick={() => {
          dispatch(historyActions.addMany(cart));
          dispatch(cartActions.clear());
        }}
      >
        Purchase
      </button>
    </div>
  );
}

export const getStaticProps: GetStaticProps<CartPageProps> = async () => {
  return {
    props: {
      store: {
        name: 'Local store',
      },
      products: [
        {
          name: 'Market item #1',
        },
        {
          name: 'Market item #2',
        },
        {
          name: 'Market item #3',
        },
      ],
    },
  };
};
