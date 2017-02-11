import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import RelationalGraph from '../components/relational_graph';
import { connect } from 'react-redux';

const query = gql`
  query Scrape($url: String!) {
    scrape {
      div
    }
  }
`;

const mapStateToProps = (state, error, response) => {
  console.log(arguments);
};

export default compose(
  connect(mapStateToProps),
  graphql(query, {
    options({
      url
    }) {
      return {
        variables: {
          url
        }
      };
    }
  })
)(RelationalGraph);
