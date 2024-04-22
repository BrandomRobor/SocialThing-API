import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

const jwtAuthConfig = {
	aud: "auth",
	iss: "social-thing",
};
const jwtPlugin = jwt({ secret: "default-secret" });

export default new Elysia({ name: "jwt.config" })
	.use(jwtPlugin)
	.derive({ as: "global" }, ({ jwt }) => {
		return {
			createJwt(payload: Record<string, string | number>) {
				return jwt.sign({ ...payload, ...jwtAuthConfig });
			},
		};
	})
	.resolve({ as: "scoped" }, async ({ headers, jwt, error }) => {
		const invalidTokenError = error(401, { message: "Invalid JWT" });
		const [bearer, token] = (headers.authorization || "").split(" ", 2);
		if (bearer !== "Bearer") {
			return invalidTokenError;
		}

		const result = await jwt.verify(token);
		if (
			!result ||
			!result.sub ||
			result.aud !== jwtAuthConfig.aud ||
			result.iss !== jwtAuthConfig.iss
		) {
			return invalidTokenError;
		}

		const userPublicId = Number.parseInt(result.sub);
		if (Number.isNaN(userPublicId)) {
			return invalidTokenError;
		}

		return { userPublicId };
	});
