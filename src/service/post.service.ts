import Elysia from "elysia";
import databaseConfig from "../plugin/database.plugin";
import { postModel } from "../model/post.model";
import type { getPostParams, postPostRequestBody } from "../schema/post.schema";
import { eq } from "drizzle-orm";

export default new Elysia({ name: "post.service" })
	.use(databaseConfig)
	.derive({ as: "scoped" }, ({ database }) => {
		return {
			postService: {
				createPost: async (
					{ content }: typeof postPostRequestBody.static,
					userPublicId: number,
				) => {
					const [{ newPostId }] = await database
						.insert(postModel)
						.values({ content, userPublicId })
						.returning({ newPostId: postModel.id });
					return newPostId;
				},
				getPostById: ({ id }: typeof getPostParams.static) =>
					database.query.postModel.findFirst({
						with: {
							author: true,
						},
						where: eq(postModel.id, id),
					}),
			},
		};
	});
