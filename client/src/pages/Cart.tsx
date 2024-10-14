import React, { useState } from "react";
import Product from "../components/ProductComponent";
import PriceDetails from "../components/PriceDetailsComponent";

const Cart: React.FC = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      itemNumber: "ABC123",
      name: "Product one",
      description: "test description lorem ipsum 10",
      colors: "black",
      seller: "testSeller",
      image: "image",
      oldPrice: 99.0,
      newPrice: 45.0,
      quantity: 1,
      availQuantity: 2,
    },
    {
      id: 2,
      itemNumber: "ABC122",
      name: "Product Two",
      description: "test description product two lorem ipsum 10",
      colors: "black",
      seller: "testSeller",
      image: "image",
      oldPrice: 999.0,
      newPrice: 800.0,
      quantity: 1,
      availQuantity: 4,
    },
    {
      id: 3,
      itemNumber: "ABC121",
      name: "Product Three",
      description: "test description product two lorem ipsum 10",
      colors: "black",
      seller: "testSeller",
      image: "image",
      oldPrice: 999.0,
      newPrice: 800.0,
      quantity: 1,
      availQuantity: 8,
    },
    {
      id: 4,
      itemNumber: "DEF456",
      name: "Product four",
      description: "test description product two lorem ipsum 10",
      colors: "black",
      seller: "testSeller",
      image: "image",
      oldPrice: 999.0,
      newPrice: 800.0,
      quantity: 3,
      availQuantity: 5,
    },
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };
  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + product.newPrice * product.quantity;
    }, 0);
  };

  return (
    <div className="h-full mt-3 mb-10">
      <h1 className="text-2xl font-bold">Product Cart Page</h1>
      <div className="flex flex-col md:flex-row justify-between mt-3 gap-2">
        <div className="md:w-6/12 lg:w-8/12 w-full flex flex-col gap-2">
          {products.map((product) => (
            <Product
              key={product.id}
              {...product}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>
        <PriceDetails totalPrice={calculateTotalPrice()} />
      </div>
    </div>
  );
};

export default Cart;
