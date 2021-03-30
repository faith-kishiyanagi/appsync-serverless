import DataApiClient from "../../lib/DataApiClient";

async function findOnePostBy(postId: string) {
  try {
    const query  = `select * from posts where id = :postId`;
    const results = await DataApiClient.query(query, { postId });
    console.log(results);
    return results.records[0];
  } catch (err) {
    console.error('Error: ', err);
    return null;
  }
}

export default findOnePostBy;
