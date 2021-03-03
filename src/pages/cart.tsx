import { GetStaticProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import CartAddItemFrom from 'src/components/pages/cart/CartAddItemForm';
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
      {/* Market */}
      <div className="mx-4 mb-8">
        <h1 className="text-xl font-bold">Market</h1>
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
      </div>

      {/* Add your own item */}
      <div className="mx-4 mb-8">
        <h1 className="text-xl font-bold">Add your own item!</h1>
        <div className="my-2">
          <CartAddItemFrom />
        </div>
      </div>

      {/* Cart */}
      <div className="mx-4">
        <h1 className="text-xl font-bold">Your cart</h1>
        <div className="my-2">
          <CartTable data={cart} />
        </div>
        <button
          className="text-white text-md bg-indigo-500 disabled:opacity-50 hover:bg-indigo-600 rounded py-2 px-4 float-right"
          disabled={cart.length === 0}
          onClick={() => {
            if (cart.length > 0) {
              dispatch(historyActions.addMany(cart));
              dispatch(cartActions.clear());

              window.alert('Item(s) have been sent to history.');
            }
          }}
        >
          Purchase
        </button>
      </div>
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
        {
          name: 'Market item #4',
        },
        {
          name: 'Market item #5',
        },
      ],
    },
  };
};
