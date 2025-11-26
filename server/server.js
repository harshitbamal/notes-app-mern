import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";



dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api/notes", noteRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
    res.send("Notes App Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
