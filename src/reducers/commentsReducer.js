const initialState = [];

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      // TODO review reducer to see if can do without overiding
      // return [...state, ...action.comments];
      return [...action.comments];
    case "POST_COMMENT":
      return [...action.comment];
    default:
      return state;
  }
};

export default commentsReducer;