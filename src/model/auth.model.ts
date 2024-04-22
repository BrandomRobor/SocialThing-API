import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { postModel } from "./post.model";

export const userModel = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 25 }).unique().notNull(),
	password: text("password").notNull(),
});

export const userRelations = relations(userModel, ({ many }) => ({
	posts: many(postModel),
}));
