import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { postModel } from "./post.model";
import { userSensitiveModel } from "./user-sensitive.model";

export const userPublicModel = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 25 }).unique().notNull(),
});

export const userRelations = relations(userPublicModel, ({ many, one }) => ({
	posts: many(postModel),
	sensitiveInformation: one(userSensitiveModel, {
		fields: [userPublicModel.id],
		references: [userSensitiveModel.userPublicId],
	}),
}));
