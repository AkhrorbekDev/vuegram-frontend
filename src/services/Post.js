import axios from 'axios';

class Post {
  static result;

  static async getPosts({ query = {} } = {}) {
    await axios.get('https://vuegramm.herokuapp.com/api/posts', { params: query })
      .then((res) => {
        const { data } = res;
        this.result = data;
      }).catch((err) => {
        this.result = err;
      });
    return this.result;
  }

  static async createPost(data) {
    const { data: response } = await axios.post('/api/posts', data);
    return response;
  }
}

export default Post;
