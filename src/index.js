import 'isomorphic-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { syncHistoryWithStore } from 'react-router-redux';
import configStore from './store';

import routes from './routes';
import createApolloClient from './helpers/create-apollo-client';

const networkInterface = createNetworkInterface({
  uri: `/graphql`,
  opts: {
    credentials: 'same-origin'
  },
  transportBatching: true
});

const client = createApolloClient({
  networkInterface,
  initialState: window.__APOLLO_STATE__,
  shouldBatch: true
});

/*
 * Sets up Redux
 */
const store = configStore(client);
const history = syncHistoryWithStore(browserHistory, store);

render((
  <ApolloProvider client={client} store={store}>
    <Router history={history} key={Math.random()} onUpdate={() => window.scrollTo(0, 0)}>
      {routes}
    </Router>
  </ApolloProvider>
), document.getElementById('app'));


if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    render((
      <ApolloProvider client={client} store={store}>
        <Router history={history} key={Math.random()} onUpdate={() => window.scrollTo(0, 0)}>
          {newRoutes}
        </Router>
      </ApolloProvider>
    ), document.getElementById('app'));
  });
}
