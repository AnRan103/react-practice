import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import App from '../App.js';

import home from './home.js';
import user from './user.js';
import base from './base.js';

const routes = [
  ...home,
  ...user,
  ...base,
];
// const HomePage = () => <div>This is a Home Page</div>
// const LoginPage = () => <div>This is a Login Page</div>

const Router = () => (
  <BrowserRouter>
    <div className="fee-content">
      <Switch>
        {
          routes.map((route, index) => (
          <Route key={index} {...route} />
          ))
        }
      </Switch>
    </div>
  </BrowserRouter>
)

export default Router;
