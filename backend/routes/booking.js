import express from "express";
import Booking from "../models/bookingSchema.js";
import Room from "../models/roomSchema.js";
import User from "../models/userSchema.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("roomId hotelId userId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении всех бронирований" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { roomId, hotelId, hotel, roomTitle, number, price, bookingDate } =
    req.body;

  const userId = req.user.id;

  try {
    const room = await Room.findById(roomId);
    if (!room || !room.available) {
      return res
        .status(400)
        .json({ error: "Номер недоступен для бронирования" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const newBooking = new Booking({
      userId,
      roomId,
      hotelId,
      hotel,
      roomTitle,
      number,
      price,
      bookingDate,
    });

    await newBooking.save();

    await Room.findByIdAndUpdate(roomId, { available: false });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking POST error:", error);

    res.status(500).json({ error: "Ошибка при создании бронирования:" });
  }
});

router.get("/:userId", authenticateToken, async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ error: "Доступ запрещён" });
  }

  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate(
      "roomId hotelId"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении бронирований" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Бронирование не найдено" });
    }

    if (req.user.id !== booking.userId.toString()) {
      return res.status(403).json({ error: "Доступ запрещён" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    await Room.findByIdAndUpdate(booking.roomId, { available: true });

    res.json({ message: "Бронирование отменено" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при отмене бронирования" });
  }
});

router.get(
  "/by-room/:roomId",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const booking = await Booking.findOne({
        roomId: req.params.roomId,
      }).populate("roomId hotelId userId");

      if (!booking) {
        return res
          .status(404)
          .json({ error: "Бронирование не найдено для этого номера" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Ошибка при получении брони по номеру" });
    }
  }
);

router.delete(
  "/by-room/:roomId",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const booking = await Booking.findOne({ roomId: req.params.roomId });

      if (!booking) {
        return res
          .status(404)
          .json({ error: "Бронирование не найдено для этого номера" });
      }

      await Booking.findByIdAndDelete(booking._id);
      await Room.findByIdAndUpdate(req.params.roomId, { available: true });

      res.json({
        message: "Бронирование по номеру удалено",
        bookingId: booking._id,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ошибка при удалении бронирования по номеру" });
    }
  }
);

export default router;
