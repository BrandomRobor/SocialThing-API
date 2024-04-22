import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { userModel } from "./auth.model";
import { relations } from "drizzle-orm";

export const postModel = pgTable("posts", {
	id: serial("id").primaryKey(),
	content: varchar("content", { length: 255 }).notNull(),
	userId: integer("userId")
		.notNull()
		.references(() => userModel.id),
});

export const postRelations = relations(postModel, ({ one }) => ({
	author: one(userModel, {
		fields: [postModel.userId],
		references: [userModel.id],
	}),
}));
