import Elysia from "elysia";
import databaseConfig from "../../config/database.config";
import { postModel } from "../../model/post/post.model";
import type { postPostRequestBody } from "../../route/post/post.schema";

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
			},
		};
	});
