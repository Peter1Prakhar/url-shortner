import "dotenv/config"
import express from "express"
import userRoutes from './routes/user.routes.js';
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000

app.use(express.json())
app.use(authMiddleware);

app.use("/api", userRoutes);


app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))