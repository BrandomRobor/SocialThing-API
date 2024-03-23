import Elysia from "elysia";
import authService from "../../service/auth/auth.service";
import { authRegisterRequestBody } from "./auth.schema";

export default new Elysia({ name: "auth.route" })
	.use(authService)
	.group("/auth", (app) =>
		app.post(
			"/register",
			async ({ authService, set, body }) => {
				await authService.createUser(body);
				set.status = 201;
				return { message: "User was created successfully" };
			},
			{ body: authRegisterRequestBody },
		),
	);
