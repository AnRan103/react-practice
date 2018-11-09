import React from 'react';

const NotFound = () => <div>This is a 404 Page</div>;

const routes = [
  { path: "*", component: NotFound },
];

export default routes;
