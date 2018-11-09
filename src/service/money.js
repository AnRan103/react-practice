import axios from './config';

const money = {
  add(params) {
    return axios.post('/money/add', params);
  },
  getList() {
    return axios.get('/money/list');
  },
};

export default money;
