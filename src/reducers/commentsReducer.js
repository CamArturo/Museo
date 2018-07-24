const initialState = {
  comments: []
}

const commentsReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'POST_COMMENT':
      return {...state, comments: [...comments, action.comment]};
    default:
      return state;
  }
}

export default commentsReducer;
