import amqplib from "amqplib";

async function producer(message) {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const exchange = "mail";
    const routingKey = "sendMail";

    await channel.assertExchange(exchange, "direct", { durable: false });
    await channel.assertQueue("nodemailer", { durable: false });

    await channel.bindQueue("nodemailer", exchange, routingKey);

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

    setTimeout(() => {
      connection.close();
    }, 1000);
  } catch (error) {
    console.error(error.message);
  }
}

export default producer;
