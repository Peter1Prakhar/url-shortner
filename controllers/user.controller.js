import db from "../db/index.js";
import { createHmac, randomBytes } from "crypto";
import { usersTable } from "../models/user.model.js";
import {eq} from "drizzle-orm";
import { signupPostRequestSchema } from "../validations/request.validations.js";

export const register = async (req, res) => {
  // Registration logic here
  const validationResult = await signupPostRequestSchema.safeParseAsync(req.body);

  if(validationResult.error){
    return res.status(400).json({error: validationResult.error.format()});
  }

  const { firstName, lastName, email, password } = validationResult.data;
  
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