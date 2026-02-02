import { Kafka, logLevel } from "kafkajs";
import Product from "../models/product.model.js";

const kafka = new Kafka({
  clientId: "product-app",
  brokers: ["localhost:9092"],
  logLevel: logLevel.ERROR,
});

//producer
export const producer = kafka.producer({
  allowAutoTopicCreation: true,
  transactionTimeout: 30000,
});

export const connectProducer = async () => {
  await producer.connect();
};

//consumer
const consumer = kafka.consumer({ groupId: "product-service" });

export const SubscribeConsumer = async () => {
  await consumer.connect();
  console.log("consumer is ready for subscribe event");

  await consumer.subscribe({ topic: "Order-created" });
  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const { price, productId, orderId } = JSON.parse(
          message.value.toString(),
        );

        await Product.findByIdAndUpdate(productId, { $set: { price: price } });
        await producer.send({
          topic: "Order-success",
          messages: [
            {
              value: JSON.stringify(orderId),
            },
          ],
        });
        console.log("send to order");
      } catch (error) {
        console.log("product error : ", error.message);
      }
    },
  });
};
