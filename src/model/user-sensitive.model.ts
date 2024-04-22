
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { userModel } from "./auth.model";
import { relations } from "drizzle-orm";

export const userSensitiveModel = pgTable("users_sensitive", {
	id: serial("id").primaryKey(),
	password: text("password").notNull(),
	userId: integer("userId")
		.notNull()
		.references(() => userModel.id),
});

export const userSensitiveRelations = relations(
	userSensitiveModel,
	({ one }) => ({
		publicInformation: one(userModel, {
			fields: [userSensitiveModel.userId],
			references: [userModel.id],
		}),
	}),
);
