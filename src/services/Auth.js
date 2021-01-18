import axios from 'axios';

class Auth {
  static result;

  static async login(formData) {
    await axios.get('/api/users/login', { params: formData })
      .then((res) => {
        const { data } = res;
        this.result = data;
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

export default Auth;
