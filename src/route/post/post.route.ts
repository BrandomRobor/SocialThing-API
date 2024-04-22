import Elysia from "elysia";
import postService from "../../service/post/post.service";
import jwtPlugin from "../../config/jwt.config";
import * as postSchema from "./post.schema";

export default new Elysia({ name: "post.route" })
	.use(postService)
	.group("/post", (app) =>
		app.guard((app) =>
			app
				.use(jwtPlugin)
				.resolve(({ userId, error }) => {
					if (!userId || Number.isNaN(userId)) {
						return error(401);
					}
					return { userId };
				})
				.post(
					"/",
					async ({ userId, body, postService }) => {
						const postId = await postService.createPost(body, userId);
						return { postId };
					},
					{
						body: postSchema.postPostRequestBody,
					},
				),
		),
	);