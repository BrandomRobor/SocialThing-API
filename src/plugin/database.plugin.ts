import { drizzle } from "drizzle-orm/postgres-js";
import Elysia from "elysia";
import postgres from "postgres";
import * as userModels from "../model/auth.model";
import * as postModels from "../model/post.model";

const connection = postgres(
	"postgres://postgres:postgres@127.0.0.1:5432/postgres",
);
const database = drizzle(connection, {
	schema: { ...userModels, ...postModels },
});
export default new Elysia({ name: "database.config" }).decorate({ database });
