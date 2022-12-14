import { combineReducers,legacy_createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
 
import post from "./modules/post";

const middlewares = [thunk];
const rootReducer = combineReducers({
  post
});
const enhancer = applyMiddleware(...middlewares);
const store = legacy_createStore(rootReducer, applyMiddleware(...middlewares));

export default store;