import axios from './config';

const money = {
  add(params) {
    return axios.post('/money/add/muti', params);
  },
  get() {
    return axios.get('/money/list');
  },
  getAverage() {
    return axios.get('/money/average');
  },
};

export default money;
