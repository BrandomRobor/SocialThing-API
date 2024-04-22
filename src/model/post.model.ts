import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { userPublicModel } from "./user-public.model";
import { relations } from "drizzle-orm";

export const postModel = pgTable("posts", {
	id: serial("id").primaryKey(),
	content: varchar("content", { length: 255 }).notNull(),
	userId: integer("userId")
		.notNull()
		.references(() => userPublicModel.id),
});

export const postRelations = relations(postModel, ({ one }) => ({
	author: one(userPublicModel, {
		fields: [postModel.userId],
		references: [userPublicModel.id],
	}),
}));
