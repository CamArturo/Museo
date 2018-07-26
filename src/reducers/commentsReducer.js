const initialState = [];

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_COMMENT":
      return [...state, action.comment]
    default:
      return state;
  }
};

export default commentsReducer;