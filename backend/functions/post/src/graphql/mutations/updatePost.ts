import Post from "../types/Post";
import DataApiClient from "../../lib/DataApiClient";

async function updatePost(post: Post) {
  if (Object.entries(post).length === 1) return;
  let query =  `update posts set`;
  const updateVariables: { [key: string]: string } = { id: post.id };
  Object.entries(post).forEach(item => {
    if (item[0] === 'id') return;
    updateVariables[item[0]] = item[1];
    if (Object.keys(updateVariables).length > 2) {
      query = `${query},`;
    }
    query = `${query} ${item[0]} = :${item[0]} `;
  })
  query = query + 'where id = :id';
  console.log(query);
  try {
    const result = await DataApiClient.query(query, updateVariables)
    console.log(result);
    if (result.numberOfRecordsUpdated === 0) return null;
    return post
  } catch (err) {
    console.error('error: ', err);
    return null;
  }
}

export default updatePost;
