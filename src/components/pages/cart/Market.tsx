export type MarketProps = {
  store: {
    name: string;
    url?: string;
  };
  items: { name: string }[];
  onItemClick?: (item: { name: string }) => void;
};

export default function Market({ items, store, onItemClick }: MarketProps) {
  const handleItemClick = (item: { name: string }) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className="flex flex-wrap -mx-2">
      {items.map((item, i) => (
        <div key={i} className="lg:w-1/5 md:w-1/3 sm:w-1/2 w-full p-2">
          <div
            className="p-4 cursor-pointer border border-gray-300 rounded-md hover:border-gray-800"
            role="button"
            tabIndex={0}
            onClick={() => handleItemClick(item)}
            onKeyDown={() => handleItemClick(item)}
          >
            <div>
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                {store.name}
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
