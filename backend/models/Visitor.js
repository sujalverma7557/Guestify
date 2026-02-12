import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  visitDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
