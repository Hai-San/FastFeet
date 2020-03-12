import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
    DeliveryerRegisterSuccess,
    DeliveryerUpdateSuccess,
    DeliveryerFailture,
    DeliveryerDeleteSuccess,
} from './actions';

export function* deliveryerRegister({ payload }) {
    try {
        const { name, email, avatar_id } = payload;

        yield call(api.post, 'deliveryers', {
            name,
            email,
            avatar_id,
        });

        toast.success('Entregador registrado com sucesso!');

        yield put(DeliveryerRegisterSuccess());
    } catch (error) {
        toast.error('Erro ao cadastrar o entregador, confira todas as informações.');
        yield put(DeliveryerFailture());
    }
}

export function* deliveryerUpdate({ payload }) {
    try {
        const { id, ...data } = payload;

        const UpdatedDeliveryer = yield call(api.put, `deliveryers/${id}`, data);

        toast.success('Entregador atualizado com sucesso!');

        yield put(DeliveryerUpdateSuccess(UpdatedDeliveryer.data));
    } catch (error) {
        toast.error('Erro ao atualizar o entregador, confira todas as informações.');
        yield put(DeliveryerFailture());
    }
}

export function updateParams() {
    history.push('/entregadores/editar');
}

export function* deliveryerDelete({ payload }) {
    try {
        const { id } = payload;

        yield call(api.delete, `deliveryers/${id}`);

        toast.success('Encomenda deletada com sucesso!');
        yield put(DeliveryerDeleteSuccess());
    } catch (error) {
        toast.error('Erro ao deletar a encomenda');
        yield put(DeliveryerFailture());
    }
}

export default all([
    takeLatest('@deliveryer/DELIVERYER_REGISTER_REQUEST', deliveryerRegister),
    takeLatest('@deliveryer/DELIVERYER_UPDATE_REQUEST', deliveryerUpdate),
    takeLatest('@deliveryer/DELIVERYER_UPDATE_PARAMS', updateParams),
    takeLatest('@deliveryer/DELIVERYER_DELETE_REQUEST', deliveryerDelete),
]);
