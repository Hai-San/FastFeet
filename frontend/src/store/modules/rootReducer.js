import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import order from './order/reducer';
import deliveryer from './deliveryer/reducer';
import recipient from './recipient/reducer';

export default combineReducers({ auth, user, order, deliveryer, recipient });
