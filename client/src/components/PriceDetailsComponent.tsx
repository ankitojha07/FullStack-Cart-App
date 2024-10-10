import React from "react";

const PriceDetails: React.FC = () => {
  return (
    <div className="border border-[#ccc] rounded-md p-2 w-full md:w-6/12 lg:w-4/12 flex flex-col gap-2 h-52 max-h-64">
      <h1 className="text-[#aaa] font-semibold uppercase">Price Details</h1>
      <div className="h-[1px] bg-[#aaa]"></div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Price (6 items)</p>
        <p>$345.00</p>
      </div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Discount</p>
        <p>$45.00</p>
      </div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Delivery Charges</p>
        <p>$5.00</p>
      </div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Packaging Fee)</p>
        <p>$1.00</p>
      </div>
      <div className="flex flex-row justify-between text-lg font-bold">
        <p>Total Amount</p>
        <p>$306.00</p>
      </div>
    </div>
  );
};

export default PriceDetails;
