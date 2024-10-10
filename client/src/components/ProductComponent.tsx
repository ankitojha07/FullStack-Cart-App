import React, { useEffect, useState } from "react";

interface ProductProps {
  name: string;
  description: string;
  colors: string;
  seller: string;
  image: string;
}

const Product: React.FC<ProductProps> = ({
  name,
  description,
  colors,
  seller,
  image,
}) => {
  let [productQuantity, setProductQuantity] = useState(0);
  const removeProduct = () => {
    if (productQuantity > 1) {
      console.log(productQuantity);
      productQuantity -= 1;
      setProductQuantity(productQuantity);
    }
  };
  const addProduct = () => {
    if (productQuantity <= 20) {
      console.log(productQuantity);
      productQuantity += 1;
      setProductQuantity(productQuantity);
    }
  };

  useEffect(() => {}, [productQuantity]);

  return (
    <div className="border border-[#ccc] rounded-md p-2 w-full">
      <div className="flex w-full flex-col md:flex-row gap-4">
        <img src={image} alt={name} className="border rounded-md" />
        <div className="flex flex-col justify-between">
          <div className="product-info flex flex-col justify-around gap-1">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-xs font-medium">{description}</p>
            <p className="text-xs font-light">Color: {colors}</p>
            <p className="text-xs font-light">Seller: {seller}</p>
          </div>
          <div className="flex flex-col w-[112px] sm:flex-row gap-4 mt-2">
            <div className="flex flex-row gap-2">
              <button
                className="bg-[#aaa] text-white px-3 py-1 text-sm font-semibold"
                onClick={removeProduct}
              >
                -
              </button>
              <input
                type="number"
                className="w-8 text-xs text-center text-[#aaa] font-bold"
                max="20"
                min="0"
                value={productQuantity}
              />
              <button
                className="bg-[#aaa] text-white px-3 py-1 text-sm font-semibold"
                onClick={addProduct}
              >
                +
              </button>
            </div>
            <button className="bg-[#aaa] text-[#fff] px-3 py-1 text-sm font-semibold">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
