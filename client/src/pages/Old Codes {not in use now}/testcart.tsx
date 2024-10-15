import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/ProductComponent";
import PriceDetails from "../../components/PriceDetailsComponent";

interface ProductData {
  _id: string;
  name: string;
  description: string;
  seller: string;
  productImage: string;
  price: number;
  numberInStock: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [error, setError] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/all-products"
        );
        const fetchedProducts = response.data.products.map((product: any) => ({
          ...product,
          quantity: 0,
        }));
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const calculateTotalPrice = () => {
    const t = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalPrice(t);
    return t;
  };

  const updateQuantity = (id: string, quantity: number) => {
    console.log("working");
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, quantity } : product
      )
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-full mt-3 mb-10">
      <h1 className="text-2xl font-bold">Product Cart Page</h1>
      <div className="flex flex-col md:flex-row justify-between mt-3 gap-2">
        {/* Left side - Products */}
        <div className="md:w-6/12 lg:w-8/12 w-full flex flex-col gap-2">
          {products.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              seller={product.seller}
              image={product.productImage}
              oldPrice={product.price * 1.2}
              newPrice={product.price}
              availQuantity={product.numberInStock}
              colors="test"
              updateQuantity={updateQuantity}
            />
          ))}
        </div>

        <PriceDetails totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default CartPage;
