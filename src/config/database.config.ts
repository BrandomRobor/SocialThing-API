import { drizzle } from "drizzle-orm/postgres-js";
import Elysia from "elysia";
import postgres from "postgres";

const connection = postgres(
	"postgres://postgres:postgres@0.0.0.0:5432/social-thing-api",
);
const database = drizzle(connection);
export default new Elysia({ name: "database" }).decorate({ database });
