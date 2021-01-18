import axios from 'axios';

class Post {
  static result;

  static async getPosts(query = {}) {
    try {
      const { data } = await axios.get('/api/posts', { params: query });
      return data;
    } catch (e) {
      return e.response;
    }
  }

  static async createPost(data) {
    const { data: response } = await axios.post('/api/posts', data);
    return response;
  }
}

export default Post;
