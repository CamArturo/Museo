// const initialState = {
//   collections: {},
//   collectionsIsLoading: false,
//   collectionsHasErrored: ""
// };

const initialState = {};

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COLLECTIONS":
      return {...action.collections}
    case "COLLECTIONS_IS_LOADING":
      return {...state, collectionsIsLoading: action.bool};
    case "COLLECTIONS_HAS_ERRORED":
      return {...state, collectionsHasErrored: action.error};
    default:
      return state;
  }
};

export default collectionsReducer;
