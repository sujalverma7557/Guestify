import express from "express";
import Visitor from "../models/Visitor.js";
import bcrypt from "bcryptjs";
const router = express.Router();
import mongoose from "mongoose";

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, visitDate, password } = req.body;

    const existingVisitor = await Visitor.findOne({ email });
    if (existingVisitor) {
      return res.status(400).json({ error: "Visitor already registered" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const visitor = new Visitor({ name, email, phone, visitDate, password: hashedPassword, status: "Pending" });
    await visitor.save();

    res.status(201).json({ message: "Visitor registered successfully", visitor });
  } catch (error) {
    console.error("Error registering visitor:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/update/:visitorId",  async (req, res) => {
  try {
    const { name, phone } = req.body;
    const { visitorId } = req.params;

    
    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    
    visitor.name = name || visitor.name;
    visitor.phone = phone || visitor.phone;

    const updatedVisitor = await visitor.save();
    res.json({ message: "Profile updated successfully", visitor: updatedVisitor });
  } catch (error) {
    console.error("Error updating visitor profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// This route for admin --->

router.put("/approve/:visitorId", async (req, res) => {
  try {
    const { status } = req.body;
    const { visitorId } = req.params;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

   
    if (!mongoose.Types.ObjectId.isValid(visitorId)) {
      return res.status(400).json({ error: " Invalid visitor ID" });
    }

    const objectId = new mongoose.Types.ObjectId(visitorId); 


    const visitor = await Visitor.findById(objectId);
    if (!visitor) {
      return res.status(404).json({ error: " Visitor not found" });
    }
    

  
    visitor.status = status;
    const updatedVisitor = await visitor.save(); 

  res.json({
      message: `Visitor status updated to "${status}"`,
      visitor: updatedVisitor,
    });

  } catch (error) {

    res.status(500).json({ error: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id).select("-password"); // Exclude password

    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    res.json(visitor);
  } catch (error) {
    console.error("Error fetching visitor data:", error);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/", async (req, res) => {
  try {
    const { status, search, startDate, endDate } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (startDate && endDate) {
      filter.visitDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const visitors = await Visitor.find(filter).sort({ visitDate: -1 });
    res.json(visitors);
  } catch (error) {
    
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
