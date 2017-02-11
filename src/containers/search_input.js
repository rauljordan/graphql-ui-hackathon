import React from 'react'
import { connect } from 'react-redux'
import scrape from '../actions/scrape'

let SearchInput = ({ dispatch }) => {
  let input;

  function handleClick() {
    dispatch(scrape(input.value))
  }

  return (
    <div className="input-group">
      <input type="text"
        className="form-control"
        placeholder="Enter url..."
        ref={node => {
          input = node
        }}/>

      <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={handleClick}>Scrape!</button>
      </span>
    </div>
  );
};

SearchInput = connect()(SearchInput)

export default SearchInput;
