const initialState = [];

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return [...state, ...action.comments];
    case "POST_COMMENT":
      return [...state, action.comment];
    default:
      return state;
  }
};

export default commentsReducer;