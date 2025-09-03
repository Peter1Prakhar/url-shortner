import {  pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 256 }).notNull(),
  lastName: varchar({ length: 256 }),
  email: varchar({ length: 256 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
});
