import Elysia from "elysia";
import databaseConfig from "../../config/database.config";
import { userModel } from "../../model/auth/auth.model";
import type { authRegisterRequestBody } from "../../route/auth/auth.schema";
import { eq } from "drizzle-orm";

export default new Elysia({ name: "auth.service" })
	.use(databaseConfig)
	.derive({ as: "scoped" }, ({ database }) => {
		return {
			authService: {
				createUser: async ({
					username,
					password,
				}: typeof authRegisterRequestBody.static) => {
					const encryptedPassword = await Bun.password.hash(password);
					await database
						.insert(userModel)
						.values({ username, password: encryptedPassword });
				},
				loginUser: async ({
					username,
					password,
				}: typeof authRegisterRequestBody.static) => {
					const userData = await database.query.userModel.findFirst({
						where: eq(userModel.username, username),
					});
					if (!userData) {
						return null;
					}

					const isPasswordCorrect = await Bun.password.verify(
						password,
						userData.password,
					);
					if (!isPasswordCorrect) {
						return null;
					}

					return "jwt";
				},
			},
		};
	});
