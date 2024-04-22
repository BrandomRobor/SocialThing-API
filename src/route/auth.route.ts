import Elysia from "elysia";
import authService from "../service/auth.service";
import * as authSchema from "../schema/auth.schema";
import postgres from "postgres";

export default new Elysia({ name: "auth.route" })
	.use(authService)
	.group("/auth", (app) =>
		app
			.post(
				"/register",
				async ({ authService, body: { username, password }, error, set }) => {
					try {
						await authService.createUser(username, password);
					} catch (e) {
						if (e instanceof postgres.PostgresError && e.code === "23505") {
							return error(409, { message: "Username is already taken" });
						}
						throw e;
					}

					set.status = 201;
					return { message: "Username created successfully" };
				},
				{
					body: authSchema.authRegisterRequestBody,
					response: {
						201: authSchema.authRegisterResponse201,
						409: authSchema.authRegisterResponse409,
					},
				},
			)
			.post(
				"/login",
				async ({ authService, error, body: { username, password } }) => {
					const userToken = await authService.loginUser(username, password);
					if (!userToken) {
						return error(401, {
							message: "Username and password combination is incorrect",
						});
					}

					return { token: `Bearer ${userToken}` };
				},
				{
					body: authSchema.authLoginRequestBody,
					response: {
						200: authSchema.authLoginResponse200,
						401: authSchema.authLoginResponse401,
					},
				},
			),
	);
