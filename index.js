import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import odooRoutes from "./routes/odoo.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import revenueRoutes from "./routes/revenue.js";
import categoryRoutes from "./routes/category.js";
import postRoutes from "./routes/post.js";

// import SearchApplicationClient from "@elastic/search-application-client";
// import Client from "@elastic/search-application-client";

import contactRoutes from "./routes/contact.js";

import Stripe from "stripe";

const app = express();
dotenv.config();

// const elastic = SearchApplicationClient(
//   "myfirstapp",
//   "https://b7f83ba5685c4e44809b81b02e880dac.us-central1.gcp.cloud.es.io:443",
//   "ejJSVjNZc0IxUmVEUnYxaHFXOUQ6VFhqTTJNWGFRTjJ2cVN0UUxDUEFZUQ=="
// );
// const elastic = SearchApplicationClient(
//   'myfirstapp', // search application name
//   'https://b7f83ba5685c4e44809b81b02e880dac.us-central1.gcp.cloud.es.io:443/_application/search_application/myfirstapp/_search', // url-host
//   'ejJSVjNZc0IxUmVEUnYxaHFXOUQ6VFhqTTJNWGFRTjJ2cVN0UUxDUEFZUQ==',  // api-key
//   {
//     // optional configuration
//   }
// )

const stripe = Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2023-10-16",
});

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//middlewares

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/odoo", odooRoutes);

app.use("/api/order", orderRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/post", postRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/stripe/config", async (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLIC,
  });
});

// app.get("/api/elastic/:param", async (req, res) => {
//   const param = req.params.param.toString();
//   const page = req.query.page;
//   try {
//     const response = await elastic().query(param).search()
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

app.post("/api/stripe/create-payment-intent/:amount", async (req, res) => {
  const amount = req.params.amount;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: amount * 100,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log("Server started on Port", process.env.PORT);
});
