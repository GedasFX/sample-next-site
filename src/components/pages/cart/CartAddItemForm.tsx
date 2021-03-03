import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import FormControl from 'src/components/common/form/FormControl';
import { cartActions } from 'src/store/cart';
import { v4 as uuid } from 'uuid';

export default function CartAddItemFrom() {
  const dispatch = useDispatch();

  const { errors, register, handleSubmit, formState } = useForm<{
    product_name: string;
    store_name?: string;
    store_url?: string;
  }>();

  const onSubmit = handleSubmit(async e => {
    dispatch(
      cartActions.add({
        id: uuid(),
        product: {
          name: e.product_name,
        },
        store: {
          name: e.store_name || 'Unknown Store',
          url: e.store_url || window.location.origin,
        },
        date_created: new Date().toISOString(),
      })
    );
  });

  return (
    <form className="-mx-2" onSubmit={onSubmit}>
      <div className="flex flex-wrap">
        <FormControl
          className="md:w-1/3 w-full text-sm px-2 mb-2"
          label="Product name*"
          name="product_name"
          ref={register({
            required: {
              value: true,
              message: 'Product name is required',
            },
            maxLength: {
              value: 240,
              message: 'Product name is too long. Try to shorten it.',
            },
          })}
          error={formState.isSubmitted && errors.product_name?.message}
        />
        <FormControl
          className="md:w-1/3 w-full text-sm px-2 mb-2"
          label="Store name"
          name="store_name"
          ref={register({
            maxLength: {
              value: 240,
              message: 'Store name is too long. Try to shorten it.',
            },
          })}
          error={formState.isSubmitted && errors.store_name?.message}
        />
        <FormControl
          className="md:w-1/3 w-full text-sm px-2 mb-2"
          label="Store URL"
          name="store_url"
          ref={register({
            maxLength: {
              value: 1200,
              message: 'Store URL is too long. Try to shorten it.',
            },
            pattern: {
              // URL Regex from https://urlregex.com/
              value: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/,
              message: 'Not a valid URL. Please make sure you entered a valid URL address.',
            },
          })}
          error={formState.isSubmitted && errors.store_url?.message}
        />
      </div>
      <div className="m-2 mt-0 w-full text-lg flex">
        <button className="border border-gray-300 rounded p-1 ml-auto mr-4" type="submit">
          <FiPlus size={16} />
        </button>
      </div>
    </form>
  );
}
