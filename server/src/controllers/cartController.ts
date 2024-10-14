import { Request, Response } from "express";
import User from "../models/userModel";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const addProducts = async (req: AuthRequest, res: Response) => {
  const { products } = req.body; // Expecting an array of products
  const userId = req.user?.id;

  // Step 1: Validate the incoming products data
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Invalid products data" });
  }

  for (const product of products) {
    const { productName, quantity, price, itemNumber } = product;

    // Check for required fields
    if (!productName || !quantity || !price) {
      return res
        .status(400)
        .json({ message: "All product fields are required" });
    }

    // Optional: Validate quantity and price values
    if (quantity <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity and price must be greater than zero" });
    }
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Step 2: Process each product
    for (const product of products) {
      const { productName, quantity, price, itemNumber } = product; // Destructure product details

      // Check if the product is already in the cart
      const cartItemIndex = user.cart.findIndex(
        (item) => item.productName === productName
      );

      // If the product exists, increase the quantity
      if (cartItemIndex > -1) {
        user.cart[cartItemIndex].quantity += quantity;
      } else {
        const dummyProductId = new mongoose.Types.ObjectId(); // Replace with actual product ID when available
        user.cart.push({
          productId: undefined,
          productName,
          quantity,
          price,
          itemNumber,
        });
      }
    }

    await user.save();
    res
      .status(200)
      .json({ message: "Products added to cart!", cart: user.cart });
  } catch (error: any) {
    console.error("Error adding products to cart:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Some error occurred!", error: error.message });
  }
};

// export const removeProduct = async (req: AuthRequest, res: Response) => {
//   const { productId } = req.body;
//   const userId = req.user?.id;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     user.cart = user.cart.filter(
//       (item) => item.productId.toString() !== productId
//     );

//     await user.save();
//     res
//       .status(200)
//       .json({ message: "Product removed from cart", cart: user.cart });
//   } catch (error) {
//     res.status(500).json({ error: "Error removing product from cart" });
//   }
// };

export const getCart = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
