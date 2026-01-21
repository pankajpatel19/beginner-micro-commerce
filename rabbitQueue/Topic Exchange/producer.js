import amqplib from "amqplib";

async function TopicProducer(routingKey, message) {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = "TopicExchange";
    const exchangeTopic = "topic";

    await channel.assertExchange(exchange, exchangeTopic, { durable: true });
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error(error.messages);
  }
}

TopicProducer("order.pankaj", { msg: "hello", body: "hehe" });
TopicProducer("payment.pankaj", { msg: "payment successfull", body: "done" });
