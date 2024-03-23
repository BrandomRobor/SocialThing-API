import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userModel = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 25 }).unique().notNull(),
	password: text("password").notNull(),
});
