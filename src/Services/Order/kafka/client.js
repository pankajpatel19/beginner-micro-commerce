import { Kafka, logLevel } from "kafkajs";
import Order from "../models/order.model.js";
import SynchProduct from "../models/LocalOrder.model.js";

const kafka = new Kafka({
  clientId: "order-app",
  brokers: ["localhost:9092"],
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
  console.log("Producer COnnected");
};

//consumer

const consumer = kafka.consumer({ groupId: "order-service" });

export const SubscribeConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: ["Order-success", "SaveToLocal"] });
  console.log("consumer Connected");

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const order = JSON.parse(message.value.toString());
        console.log(order);

        switch (topic) {
          case "Order-success":
            await Order.findByIdAndUpdate(order, {
              $set: {
                status: "CONFIRMED",
              },
            });

            console.log("Order Updated");
            break;

          case "SaveToLocal":
            await SynchProduct.findOneAndUpdate(
              { productId: order.productId },
              order,
              { upsert: true },
            );
            console.log("🔄 Sync Product Data:", order.name);
        }
      } catch (error) {
        console.log("order  error :", error.message);
      }
    },
  });
};
