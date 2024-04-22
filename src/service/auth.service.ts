import Elysia from "elysia";
import databaseConfig from "../plugin/database.plugin";
import { userPublicModel } from "../model/user-public.model";
import type { authRegisterRequestBody } from "../schema/auth.schema";
import { eq } from "drizzle-orm";
import jwtPlugin from "../plugin/jwt.plugin";
import { userSensitiveModel } from "../model/user-sensitive.model";

export default new Elysia({ name: "auth.service" })
	.use(databaseConfig)
	.use(jwtPlugin)
	.derive({ as: "scoped" }, ({ database, createJwt }) => {
		return {
			authService: {
				createUser: async ({
					username,
					password,
				}: typeof authRegisterRequestBody.static) => {
					const encryptedPassword = await Bun.password.hash(password);
					const [{ userPublicId }] = await database
						.insert(userPublicModel)
						.values({ username })
						.returning({ userPublicId: userPublicModel.id });
					await database
						.insert(userSensitiveModel)
						.values({ password: encryptedPassword, userPublicId });
				},
				loginUser: async ({
					username,
					password,
				}: typeof authRegisterRequestBody.static) => {
					const userData = await database.query.userPublicModel.findFirst({
						with: { sensitiveInformation: true },
						where: eq(userPublicModel.username, username),
					});
					if (!userData || !userData.sensitiveInformation) {
						return null;
					}

					const isPasswordCorrect = await Bun.password.verify(
						password,
						userData.sensitiveInformation.password,
					);
					if (!isPasswordCorrect) {
						return null;
					}

					return createJwt({ sub: userData.id.toString() });
				},
			},
		};
	});
