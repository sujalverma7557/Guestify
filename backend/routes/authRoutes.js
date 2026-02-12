import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Admin.js"; // Admin Model
import Visitor from "../models/Visitor.js"; // Visitor Model
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


router.post("/visitors/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const visitor = await Visitor.findOne({ email });
    if (!Visitor || !visitor.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
   


    const isMatch = await bcrypt.compare(password, visitor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      visitor: { _id: visitor._id, name: visitor.name, email: visitor.email },
      token: generateToken(visitor._id),
    });
  } catch (error) {
    console.error("Error logging in visitor:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/profile", protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
