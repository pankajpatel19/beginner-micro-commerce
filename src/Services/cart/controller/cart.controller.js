import Cart from "../models/cart.model.js";
import fetchProduct from "../utils/fetchProduct.js";

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const product = await fetchProduct(productId);
    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const { userId } = req.user;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      await Cart.create({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();

    res.status(200).json({ message: "added to cart" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const RemoveFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const { userId } = req.user;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart Not Found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.find({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: "Items Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
