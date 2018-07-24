import { combineReducers } from 'redux';
import collections from './collectionsReducer';
import comments from './commentsReducer';

const rootReducer = combineReducers({
  collections,
  comments
});

export default rootReducer;
