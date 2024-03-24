import Elysia from "elysia";
import authService from "../../service/auth/auth.service";
import { authRegisterRequestBody } from "./auth.schema";
import postgres from "postgres";

export default new Elysia({ name: "auth.route" })
	.use(authService)
	.group("/auth", (app) =>
		app.post(
			"/register",
			async ({ authService, set, body }) => {
				try {
					await authService.createUser(body);
				} catch (e) {
					if (e instanceof postgres.PostgresError && e.code === "23505") {
						set.status = 409;
						return { message: "Username is already taken" };
					}
					throw e;
				}

				set.status = 201;
				return { message: "User was created successfully" };
			},
			{ body: authRegisterRequestBody },
		),
	);
