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
					userId: number,
				) => {
					const [newPost] = await database
						.insert(postModel)
						.values({ content, userId })
						.returning();
					return newPost.id;
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
