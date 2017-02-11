import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../components/layout';
import Home from '../components/home';
import RelationalGraph from '../components/relational_graph';

export default (
  <Route
    path="/"
    component={Layout}
  >
      <IndexRoute
        component={Home}
      />
  </Route>
);
