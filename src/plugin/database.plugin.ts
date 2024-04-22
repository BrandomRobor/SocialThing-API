import { drizzle } from "drizzle-orm/postgres-js";
import Elysia from "elysia";
import postgres from "postgres";
import * as userPublicModels from "../model/user-public.model";
import * as userSensitiveModels from "../model/user-sensitive.model";
import * as postModels from "../model/post.model";

const connection = postgres(
	"postgres://postgres:postgres@127.0.0.1:5432/postgres",
);
const database = drizzle(connection, {
	schema: { ...userPublicModels, ...userSensitiveModels, ...postModels },
});
export default new Elysia({ name: "database.config" }).decorate({ database });
