import { combineReducers } from 'redux';
import authReducer from '../features/auth/reducer';
import jobsReducer from '../features/admin/reducers';
import userjobsReducer from '../features/user/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: jobsReducer,
  user: userjobsReducer,
});

export default rootReducer;
