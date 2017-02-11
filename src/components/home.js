import React from 'react';
import RelationalGraph from '../containers/relational_graph';
import SearchInput from '../containers/search_input';


function Home() {
  return (
    <div>
      <SearchInput/>
      <RelationalGraph/>
    </div>
  );
}

export default Home;
