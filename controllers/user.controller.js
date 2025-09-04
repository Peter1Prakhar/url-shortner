import db from "../db/index.js";
import { createHmac, randomBytes } from "crypto";
import { usersTable } from "../models/user.model.js";
import {eq} from "drizzle-orm";

export const register = async (req, res) => {
  // Registration logic here
  const { firstName, lastName, email, password } = req.body;
  if(!firstName || !email || !password) {
    return res.status(400).json({ message: "First name, email, and password are required." });
  }
  const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use." });
  }
    const salt = randomBytes(256).toString("hex");
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
    const [user] = await db.insert(usersTable).values({
      firstName,
      lastName,
        email,
        password: hashedPassword,
        salt
    }).returning({id: usersTable.id});
    res.status(201).json({ message: "User registered successfully", userId: user.id });
}