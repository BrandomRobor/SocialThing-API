
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { userPublicModel } from "./user-public.model";
import { relations } from "drizzle-orm";

export const userSensitiveModel = pgTable("users_sensitive", {
	id: serial("id").primaryKey(),
	password: text("password").notNull(),
	userId: integer("userId")
		.notNull()
		.references(() => userPublicModel.id),
});

export const userSensitiveRelations = relations(
	userSensitiveModel,
	({ one }) => ({
		publicInformation: one(userPublicModel, {
			fields: [userSensitiveModel.userId],
			references: [userPublicModel.id],
		}),
	}),
);
