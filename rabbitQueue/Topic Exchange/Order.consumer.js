import amqplib from "amqplib";

async function OrderConsumer() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = "TopicExchange";
    const exchangeTopic = "topic";

    await channel.assertExchange(exchange, exchangeTopic, { durable: true });
    await channel.assertQueue("OrderQueue", { durable: true });

    await channel.bindQueue("OrderQueue", exchange, "order.*");

    channel.consume(
      "OrderQueue",
      (msg) => {
        if (msg !== null) {
          console.log(`${msg.fields.routingKey} : ${msg.content}`);
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error(error.message);
  }
}
OrderConsumer();
