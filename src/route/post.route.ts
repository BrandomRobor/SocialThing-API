import Elysia from "elysia";
import postService from "../service/post.service";
import jwtPlugin from "../plugin/jwt.plugin";
import * as postSchema from "../schema/post.schema";

export default new Elysia({ name: "post.route" })
	.use(postService)
	.group("/post", (app) =>
		app
			.guard((app) =>
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
						async ({ userId, body: { content }, postService }) => {
							const postId = await postService.createPost(content, userId);
							return { postId };
						},
						{
							body: postSchema.postPostRequestBody,
						},
					),
			)
			.get(
				"/:id",
				async ({ params: { id }, postService, error }) => {
					const post = await postService.getPostById(id);

					if (!post) {
						return error(404);
					}

					return post;
				},
				{
					params: postSchema.getPostParams,
				},
			),
	);
