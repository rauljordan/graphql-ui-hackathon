import ApolloClient, { addTypename } from 'apollo-client';

/**
 * Builds an apollo client that we can customize however we want to
 * @param  {Object} options default options we want to set
 */
export default (options) => new ApolloClient(Object.assign({}, {
  queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  }
}, options));
