import DataApiClient from "../../lib/DataApiClient";

async function deletePost(postId: string) {
  try {
    const query = `delete from posts where id = :postId`;
    const result = await DataApiClient.query(query, { postId });
    console.log(result);
    if (result.numberOfRecordsUpdated === 1) return postId;
    return null;
  } catch (err) {
    console.error('Error: ', err);
    return null;
  }
}

export default deletePost;
