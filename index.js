import "dotenv/config"
import express from "express"
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT ?? 8000

app.use(express.json())

app.use("/api", userRoutes);


app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))