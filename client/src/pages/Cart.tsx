import React from "react";
import Product from "../components/ProductComponent";
import PriceDetails from "../components/PriceDetailsComponent";

const Cart: React.FC = () => {
  return (
    <div className="h-full mt-3">
      <h1 className="text-xl font-bold">Product Cart Page</h1>
      <div className="flex flex-col md:flex-row justify-between mt-3 gap-2">
        <div className="md:w-6/12 lg:w-8/12 w-full">
          <Product
            name="Product one"
            description="test description lorem ipsum 10"
            colors="black"
            seller="testSeller"
            image="image"
          />
        </div>
        <PriceDetails />
      </div>
    </div>
  );
};

export default Cart;
