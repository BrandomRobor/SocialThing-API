import Elysia from "elysia";
import authRoute from "./route/auth/auth.route";

const port = process.env.PORT || 3000
const app = new Elysia();

if (process.env.NODE_ENV !== "production") {
	const { swagger } = await import("@elysiajs/swagger");
	app.use(
		swagger({
			documentation: {
				info: {
					title: "SocialThing API Docs",
					version: "0.1.0",
				},
			},
		}),
	);
}

app.use(authRoute);

app.listen(port);

console.log(`Running on port ${port}`);
