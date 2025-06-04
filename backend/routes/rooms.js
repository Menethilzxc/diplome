import express from "express";
import Room from "../models/roomSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { hotelId } = req.query;

    const filter = hotelId ? { hotelId } : {};

    const rooms = await Room.find(filter);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении номеров" });
  }
});

router.get("/hotel/:hotelId", async (req, res) => {
  try {
    const rooms = await Room.find({ hotelId: req.params.hotelId });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении номеров отеля" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: "Номер не найден" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении номера" });
  }
});

//add room
router.post("/", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ error: "Ошибка при добавлении номера" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { available: req.body.available },
      { new: true }
    );
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ error: "Ошибка при обновлении номера" });
  }
});

export default router;
