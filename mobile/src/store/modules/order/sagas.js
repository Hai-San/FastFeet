import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { orderStartSuccess, orderFailture } from './actions';

export function* orderStart({ payload }) {
    try {
        const { id } = payload;

        yield call(api.put, `deliveryer/order/${id}/start`);

        yield put(orderStartSuccess());
    } catch (error) {
        Alert.alert('Erro ao Iniciar', 'Fale com os administradores');
        yield put(orderFailture());
    }
}

export default all([takeLatest('@order/ORDER_START_REQUEST', orderStart)]);
