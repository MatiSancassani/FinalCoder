import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import MongoStore from 'connect-mongo';
import cors from 'cors';

import passport from "./config/passport.strategies.js";
import config from "./config.js";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import authRoutes from "./routes/auths.routes.js";
import usersRoutes from './routes/users.routes.js'

const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500'];
const app = express();
const corsOptions = {
  origin: true, // Permite cualquier origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
const expressInstance = app.listen(config.PORT, async () => {
  await mongoose.connect(config.MONGODB_URI);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(config.SECRET));
  app.use(passport.initialize());
  app.use("/static", express.static(`${config.DIRNAME}/public`));

  app.use("/api/products", productsRoutes);
  app.use("/api/carts", cartsRoutes);
  app.use("/api/auth", authRoutes);
  app.use('/api/users', usersRoutes);

  console.log(`Servidor activo en http://localhost:${config.PORT}`);
});
