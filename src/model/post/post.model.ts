import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { userModel } from "../auth/auth.model";

export const postModel = pgTable("posts", {
	id: serial("id").primaryKey(),
	content: varchar("content", { length: 255 }).notNull(),
	userId: integer("userId")
		.notNull()
		.references(() => userModel.id),
});
