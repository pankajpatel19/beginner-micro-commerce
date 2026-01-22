import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const envPath = path.resolve(dirname, "../.env");

dotenv.config({ path: envPath });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((success, error) => {
  if (error) {
    console.log("error while transport email", error);
  } else {
    console.log("nodemailer Connected");
  }
});

export const loginEmail = async (to, subject) => {
  try {
    const info = await transporter.sendMail({
      from: `"Project Marketplace" <${process.env.MAIL_USER}>`,
      to: to,
      subject: subject,
      html: `<b><h1>Login Detected</h1></b>`,
    });
    console.log(`message sent to ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};
