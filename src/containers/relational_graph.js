import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import RelationalGraph from '../components/relational_graph';

const query = gql`
  query Scrape($url: String!) {
    scrape {
      div
    }
  }
`;

export default compose(
  graphql(query)
)(RelationalGraph);
