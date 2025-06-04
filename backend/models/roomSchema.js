import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  number: Number,
  title: String,
  price: Number,
  available: { type: Boolean, default: true },
});

export default mongoose.model("Room", roomSchema);
