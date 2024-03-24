import jwt from "@elysiajs/jwt";
export const jwtAuthConfig = {
	aud: "auth",
	iss: "social-thing",
};
export default jwt({ secret: "default-secret" });
