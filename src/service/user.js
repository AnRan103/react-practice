import axios from './config';

const User = {
  login(params) {
    return axios.post('/user/login', params);
  },
  logout(params) {
    return axios.post('/user/logout', params);
  }
}

export default User;
