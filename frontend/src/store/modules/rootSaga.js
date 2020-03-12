import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import order from './order/sagas';
import deliveryer from './deliveryer/sagas';
import recipient from './recipient/sagas';

export default function* rootSaga() {
    return yield all([auth, order, deliveryer, recipient]);
}
