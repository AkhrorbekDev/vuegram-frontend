import axios from 'axios';

class User {
  static result;

  static async create(data) {
    await axios.post('/api/users', data)
      .then((response) => {
        this.result = response.data;
      }).catch((err) => {
        const { data: errorMessage } = err.response;
        if (errorMessage.message.parent.constraint === 'users_login_key') {
          this.result = {
            status: errorMessage.status,
            message: `${data.login} is exist`,
          };
        } else {
          this.result = {
            status: errorMessage.status,
            message: `${data.email} is exist`,
          };
        }
      });
    return this.result;
  }

  static async get({ query = {} } = {}) {
    await axios.get('https://vuegramm.herokuapp.com/api/users', { params: query })
      .then((res) => {
        const { data } = res;
        this.result = {
          status: data.status,
          data: data.data,
        };
      }).catch((err) => {
        const { data: errorMessage } = err.response;
        this.result = {
          status: errorMessage.status,
          message: errorMessage.message,
        };
      });

    return this.result;
  }
}

export default User;
