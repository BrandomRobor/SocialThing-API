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
	.resolve({ as: "scoped" }, async ({ headers, jwt }) => {
		const [bearer, token] = (headers.authorization || "").split(" ", 2);
		if (bearer !== "Bearer") {
			return { userId: null };
		}

		const result = await jwt.verify(token);
		if (
			!result ||
			!result.sub ||
			result.aud !== jwtAuthConfig.aud ||
			result.iss !== jwtAuthConfig.iss
		) {
			return { userId: null };
		}

		return { userId: Number.parseInt(result.sub) };
	});
