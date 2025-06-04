import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import hotelRoutes from "./routes/hotels.js";
import roomRoutes from "./routes/rooms.js";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";

const PORT = process.env.PORT || 3001;

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB подключен"))
  .catch((error) => console.error("Ошибка подключения MongoDB: ", error));

app.get("/", (req, res) => {
  res.send("Сервер работает");
});

app.use("/hotels", hotelRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
