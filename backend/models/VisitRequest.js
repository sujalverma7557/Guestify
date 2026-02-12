import mongoose from "mongoose";

const visitRequestSchema = new mongoose.Schema({
  visitor: { type: mongoose.Schema.Types.ObjectId, ref: "Visitor", required: true },
  requestType: { type: String, enum: ["Reschedule"], required: true },
  newVisitDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("VisitRequest", visitRequestSchema);
