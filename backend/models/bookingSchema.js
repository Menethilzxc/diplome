import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  hotel: {
    type: String,
    required: true,
  },
  roomTitle: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    requi: true,
  },
});

export default mongoose.model("Booking", bookingSchema);
