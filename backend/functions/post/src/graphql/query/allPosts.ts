import DataApiClient from "../../lib/DataApiClient";

async function allPosts() {
  try {
    const result = await DataApiClient.query('select * from posts;');
    return result.records;
  } catch (e) {
    console.error('Error: ' + e);
    return null;
  }
}

export default allPosts;
