export declare global {
  namespace Dto {
    interface Product {
      id: string | number;
      product: {
        name: string;
      };
      store: {
        name: string;
        url: string;
      };
      date_created: string;
    }
  }
}
