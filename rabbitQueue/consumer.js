import amqplib from "amqplib";

async function consumer() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("nodemailer", { durable: false });

    channel.consume("nodemailer", (message) => {
      if (message !== null) {
        console.log(JSON.parse(message.content));
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

consumer();
