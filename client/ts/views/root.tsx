import { render } from 'react-dom';
import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
const { ReactRouterGlobalHistory } = require('react-router-global-history');
import Layout from './layout';
import Home from './home';

export default class RootViewLoader {
  static initialise() {
    render((
      <BrowserRouter>
        <Layout>
          <ReactRouterGlobalHistory />
          <Switch>
            <Route path='/' component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    ), document.getElementById('react'));
  }
}
