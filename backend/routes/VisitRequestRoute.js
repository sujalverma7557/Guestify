import express from "express";
import VisitRequest from "../models/VisitRequest.js";
import Visitor from "../models/Visitor.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Submit a Reschedule Request
router.post("/reschedule", protect, async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }
  
      const { newVisitDate, reason } = req.body;
  
      const visitRequest = new VisitRequest({
        visitor: req.user._id, 
        requestType: "Reschedule",
        newVisitDate,
        reason,
      });
  
      await visitRequest.save();
      res.status(201).json({ message: "Request submitted successfully", visitRequest });
    } catch (error) {
      console.error("Error submitting reschedule request:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

// ✅ Admin: View All Reschedule Requests
router.get("/", async (req, res) => {
  try {
    const requests = await VisitRequest.find().populate("visitor", "name email");
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Admin: Approve/Reject Request
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const visitRequest = await VisitRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!visitRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json({ message: `Request ${status.toLowerCase()} successfully`, visitRequest });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
