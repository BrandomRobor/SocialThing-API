import Elysia from "elysia";
import databaseConfig from "../../config/database.config";
import { userModel } from "../../model/auth/auth.model";
import type { authRegisterRequestBody } from "../../route/auth/auth.schema";

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
			},
		};
	});
