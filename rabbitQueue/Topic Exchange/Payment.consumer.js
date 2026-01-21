import amqplib from "amqplib";

async function PaymentConsumer() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = "TopicExchange";
    const exchangeTopic = "topic";

    await channel.assertExchange(exchange, exchangeTopic, { durable: true });
    await channel.assertQueue("PaymentQueue", { durable: true });

    await channel.bindQueue("PaymentQueue", exchange, "payment.*");
    channel.consume(
      "PaymentQueue",
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
PaymentConsumer();
