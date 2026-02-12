import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      admin: { _id: admin._id, name: admin.name, email: admin.email },
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
 
  
      const admin = await Admin.findOne({ email });
  

      if (!admin || !admin.password) {

        return res.status(401).json({ error: "Invalid email or password" });
      }
  
   
  
      // ✅ Compare Entered Password with Hashed Password in DB
      const isMatch = await bcrypt.compare(password, admin.password);
    
  
      if (!isMatch) {
       
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      res.json({
        message: "Admin login successful",
        admin: { _id: admin._id, name: admin.name, email: admin.email },
        token: generateToken(admin._id),
      });
    } catch (error) {
    
      res.status(500).json({ error: "Server error" });
    }
  });
    
export default router;
