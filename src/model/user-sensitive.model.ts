
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { userPublicModel } from "./user-public.model";

export const userSensitiveModel = pgTable("users_sensitive", {
	id: serial("id").primaryKey(),
	password: text("password").notNull(),
	userPublicId: integer("userPublicId")
		.notNull()
		.references(() => userPublicModel.id),
});
