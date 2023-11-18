import React from 'react'

interface Props {
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    id: number;
  }
  type Item = {
    item: Props;
  };

const SearchProducts = ({ item }: Item) => {
  return (
    <div className="flex items-center gap-4">
      <img className="w-24 m-4 mr-2" src={item.image} alt="productImage" />
      <div>
        <p className="text-xs -mb-1">
          {item.category}
        </p>
        <p className="text-lg font-medium">{item.title}</p>
        <p className="text-xs">{item.description.substring(0, 100)}</p>
        <p className="text-sm flex items-center gap-1">
          price:{" "}
          <span className="font-semibold">
            {item.price}
          </span>
        </p>
      </div>
      <div className="flex-1 text-right px-4">
      </div>
    </div>
  );
}

export default SearchProducts