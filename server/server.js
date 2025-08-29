import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({path: './.env'})
import userRoutes from "./routes/user.routes.js";
import bugRoutes from "./routes/bug.routes.js";
import connectDB from "./utils/db.js";

connectDB(`${process.env.MONGODB_URI}`);
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/bugs', bugRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
