import { t } from "elysia";

export const authRegisterRequestBody = t.Object({
	username: t.String({ maxLength: 25 }),
	password: t.String(),
});
