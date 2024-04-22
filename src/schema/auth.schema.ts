import { t } from "elysia";

export const authRegisterRequestBody = t.Object({
	username: t.String({
		maxLength: 25,
		description: "Username of the account",
		examples: ["testuser"],
	}),
	password: t.String({
		description: "Password of the account",
		examples: ["testpassword"],
	}),
});
export const authRegisterResponse201 = t.Object({
	message: t.String({
		description: "Message confirming registration",
		examples: ["Username created successfully"],
	}),
});
export const authRegisterResponse409 = t.Object({
	message: t.String({
		description: "Message showing an error",
		examples: ["Username is already taken"],
	}),
});

export const authLoginRequestBody = t.Object({
	username: t.String({
		description: "Username of the account",
		examples: ["testuser"],
	}),
	password: t.String({
		description: "Password of the account",
		examples: ["testpassword"],
	}),
});
export const authLoginResponse200 = t.Object({
	token: t.String({
		description: "Bearer token representing the user",
		examples: ["Bearer ..."],
	}),
});
export const authLoginResponse401 = t.Object({
	message: t.String({
		description: "Message showing an error",
		examples: ["Username and password combination is incorrect"],
	}),
});
