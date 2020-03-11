import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';

import { signInSuccess, signFailture } from './actions';

export function* signIn({ payload }) {
    try {
        const { id } = payload;

        const response = yield call(api.post, 'login', {
            id,
        });

        const { token, deliveryer } = response.data;

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, deliveryer));
    } catch (error) {
        Alert.alert('Erro ao conectar', 'Este ID não existe');
        yield put(signFailture());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export default all([takeLatest('persist/REHYDRATE', setToken), takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
