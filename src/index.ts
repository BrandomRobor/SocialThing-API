import Elysia from "elysia";

const port = process.env.PORT || 3000
const app = new Elysia();
app.listen(port);

console.log(`Running on port ${port}`);
