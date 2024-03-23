import Elysia from "elysia";
import authRoute from "./route/auth/auth.route";

const port = process.env.PORT || 3000
const app = new Elysia();

app.use(authRoute);

app.listen(port);

console.log(`Running on port ${port}`);
