import Post from "../types/Post";
import DataApiClient from "../../lib/DataApiClient";
const { v4: uuid } = require('uuid');

async function createPost(post: Post) {
  if (!post.id) post.id = uuid();
  const { id, title, content } = post;
  try {
    const query = `INSERT INTO posts (id, title, content) VALUES(:id, :title, :content)`;
    console.log(query);
    const result = await DataApiClient.query(query, { id, title, content });
    console.log(result);
    return post;
  } catch (err) {
    console.error('Error: ', err);
    return null;
  }
}

export default createPost;
