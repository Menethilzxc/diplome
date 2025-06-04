import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
});

export default mongoose.model("Hotel", hotelSchema);
