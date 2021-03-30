import Post from "./graphql/types/Post";
import createPost from "./graphql/mutations/createPost";
import allPosts from "./graphql/query/allPosts";
import updatePost from "./graphql/mutations/updatePost";
import deletePost from "./graphql/mutations/deletePost";
import findOnePostBy from "./graphql/query/findOnePostBy";


type AppSyncEvent = {
  info: {
    fieldName: string
  },
  arguments: {
    post: Post,
    postId: string
  }
}

exports.handler = async (event:AppSyncEvent) => {
  switch (event.info.fieldName) {
    case 'createPost':
      return await createPost(event.arguments.post);
    case 'allPosts':
      return await allPosts();
    case 'updatePost':
      return await updatePost(event.arguments.post);
    case 'deletePost':
      return await deletePost(event.arguments.postId);
    case 'findOnePostBy':
      return await findOnePostBy(event.arguments.postId);
    default:
      return null;
  }
}
