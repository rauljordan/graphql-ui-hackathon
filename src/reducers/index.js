
const scrape = (state = [], action) => {
  switch (action.type) {
    case 'SCRAPE':
      return [
        ...state,
        {
          url: action.url
        }
      ]
    default:
      return state
  }
}


export default scrape;
