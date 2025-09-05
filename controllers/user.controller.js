import db from "../db/index.js";

import { usersTable } from "../models/user.model.js";
import {eq} from "drizzle-orm";
import { signupPostRequestSchema, loginPostRequestSchema } from "../validations/request.validations.js";
import { hashPassword } from "../utils/hash.js";
import { createUserToken } from "../utils/token.js";

export const register = async (req, res) => {
  // Registration logic here
  const validationResult = await signupPostRequestSchema.safeParseAsync(req.body);

  if(validationResult.error){
    return res.status(400).json({error: validationResult.error});
  }

  const { firstName, lastName, email, password } = validationResult.data;

  const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use." });
  }
    const { salt, password:hashedPassword } = hashPassword(password);
    const [user] = await db.insert(usersTable).values({
      firstName,
      lastName,
        email,
        password: hashedPassword,
        salt
    }).returning({id: usersTable.id});
    res.status(201).json({ message: "User registered successfully", userId: user.id });
}

export const login = async (req, res) => {
  const validationResult = await loginPostRequestSchema.safeParseAsync(req.body);
  if(validationResult.error){
    return res.status(400).json({error: validationResult.error});
  }
  const { email, password } = validationResult.data;
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }
  const { password: hashedPassword } =  hashPassword(password, user.salt);
  if (hashedPassword !== user.password) {
    return res.status(400).json({ message: "Invalid email or password." });
  }
  const token = await createUserToken({id: user.id});
  res.status(200).json({ token }); 
}