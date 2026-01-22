import amqplib from "amqplib";
import { loginEmail } from "../src/Services/user/utils/mail.js";

async function consumer() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("nodemailer", { durable: false });

    channel.consume("nodemailer", async (message) => {
      try {
        if (message !== null) {
          const { to, subject } = JSON.parse(message.content.toString());

          await loginEmail(to, subject);
          console.log("successfully mail send");

          channel.ack(message);
        }
      } catch (mailerror) {
        console.log("mail error ", mailerror.message);
        channel.nack(message, false, null);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

consumer();
