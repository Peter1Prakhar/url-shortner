import {  pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const urlsTable = pgTable("urls", {
    id: uuid().primaryKey().defaultRandom(),
    
    shortCode: varchar({ length: 256 }).notNull().unique(),
    targetUrl: text().notNull(),

    userId: uuid().references(() => (usersTable.id)).notNull(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(() => new Date()),
});