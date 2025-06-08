import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "./models/hotelSchema.js";
import Room from "./models/roomSchema.js";
import Booking from "./models/bookingSchema.js";
import User from "./models/userSchema.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);
console.log("Connecting to MongoDB");

await Hotel.deleteMany();
await Room.deleteMany();
await Booking.deleteMany();

const users = await User.find();

console.log("Old data delete");

const description =
  "Кстати, явные признаки победы институционализации, инициированные исключительно синтетически, смешаны с не уникальными данными до степени совершенной неузнаваемости...";

const image =
  "https://investinbelarus.by/upload/resize_cache/iblock/6f1/7vvso5wcq06kgfi3zi02hvm9r4pwqlq7/577_408_0/16609115651800.jpg";

const hotels = [];
const rooms = [];
const bookings = [];

for (let i = 1; i <= 9; i++) {
  const hotel = new Hotel({
    title: `Отель ${i}`,
    description,
    image,
  });

  hotels.push(hotel);
  await hotel.save();

  for (let j = 1; j <= 6; j++) {
    const isLux = j % 2 === 0;
    const room = new Room({
      hotelId: hotel._id.toString(),
      title: isLux ? "Люкс" : "Стандарт",
      number: j,
      price: isLux ? 10000 : 5000,
      available: true,
    });

    rooms.push(room);
    await room.save();

    if (j === 2 || j === 5) {
      const booking = new Booking({
        roomId: room._id.toString(),
        hotelId: hotel._id.toString(),
        hotel: hotel.title,
        number: room.number,
        roomTitle: room.title,
        price: room.price,
        bookingDate: new Date(),
        userId: users[Math.floor(Math.random() * users.length)]._id,
      });

      bookings.push(booking);
      booking.save();
    }
  }
}

console.log(`Создано отелей: ${hotels.length}`);
console.log(`Создано номеров: ${rooms.length}`);
console.log(`Создано бронирований: ${bookings.length}`);

mongoose.disconnect();
