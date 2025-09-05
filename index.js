import "dotenv/config"
import express from "express"
import userRoutes from './routes/user.routes.js';
import { authMiddleware } from "./middlewares/auth.middleware.js";
import urlRoutes from "./routes/url.routes.js"

const app = express();
const PORT = process.env.PORT ?? 8000

app.use(express.json())
app.use(authMiddleware);

app.use("/api", userRoutes);
app.use(urlRoutes);
app.get("/", (req, res) => {
    const user = req.user;
    if(user){
        return res.status(200).json({message: "User is logged in", user})
    }
    res.status(200).json({message: "User is not logged in"})
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))