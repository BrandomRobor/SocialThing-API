import { t } from "elysia";

export const postPostRequestBody = t.Object({
	content: t.String({
		maxLength: 255,
		description: "Content of the new post",
		examples: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
	}),
});
