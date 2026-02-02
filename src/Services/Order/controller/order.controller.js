import { v4 as uuidv4 } from "uuid";
import Order from "../models/order.model.js";
import { producer } from "../kafka/client.js";
import SynchProduct from "../models/LocalOrder.model.js";

export const createOrder = async (req, res) => {
  try {
    const { productId, quantity, price, desc } = req.body;
    const { userId } = req.user;

    if (!userId || !productId || !quantity || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await SynchProduct.findOne({ productId });
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const order = await Order.create({
      orderId: uuidv4(),
      userId,
      productId,
      quantity,
      price,
      status: "PENDING",
    });
    const messagePayload = {
      orderId: order._id,
      price,
      productId,
      quantity,
      status: "Created",
    };

    await producer.send({
      topic: "Order-created",
      messages: [
        {
          key: order.userId,
          value: JSON.stringify(messagePayload),
        },
      ],
      acks: -1,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully and send event to Kafka",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "PENDING",
      "CONFIRMED",
      "CANCELLED",
      "PAYMENT_PENDING",
      "PAID",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};
