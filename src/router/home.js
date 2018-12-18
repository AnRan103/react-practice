import Home from '../page/home/index.js';
import Fee from '../page/home/fee.js';

const routes = [
  { path: '/', exact: true, component: Home },
  { path: '/home', component: Home },
  { path: '/fee', component: Fee },
];

export default routes;
