import express from "express";
import Hotel from "../models/hotelSchema.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении отелей", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Некорректный ID отеля" });
    }

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Отель не найден" });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении отеля: ", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании отеля", error });
  }
});

export default router;
