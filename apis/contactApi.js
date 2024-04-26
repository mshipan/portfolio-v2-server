const express = require("express");
const nodemailer = require("nodemailer");

const contactApi = (contactsCollection) => {
  const contactRouter = express.Router();

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.Nodemailer_Host,
    port: process.env.Nodemailer_Port,
    secure: true,
    auth: {
      user: process.env.Nodemailer_User,
      pass: process.env.Nodemailer_Pass,
    },
  });

  contactRouter.post("/", async (req, res) => {
    const { name, email, phone, subject, comment } = req.body;

    const mailOptions = {
      from: email,
      to: process.env.Nodemailer_User,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: \n${comment}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // console.error(error);
        res
          .status(500)
          .json({ success: false, message: "Error sending message" });
      } else {
        // console.log("Email sent: " + info.response);
        res
          .status(200)
          .json({ success: true, message: "Message sent successfully" });
      }
    });

    const newContact = req.body;
    const result = await contactsCollection.insertOne(newContact);
    res.send(result);
  });

  return contactRouter;
};

module.exports = contactApi;
