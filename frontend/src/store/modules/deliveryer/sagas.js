import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { DeliveryerUpdateSuccess, DeliveryerFailture, DeliveryerDeleteSuccess } from './actions';

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

        yield call(api.delete, `deliveryer/${id}`);

        toast.success('Entregador deletado com sucesso!');
        yield put(DeliveryerDeleteSuccess());
    } catch (error) {
        toast.error(`Erro ao deletar o entregador: ${error.response.data.error}`);
        yield put(DeliveryerFailture());
    }
}

export default all([
    takeLatest('@deliveryer/DELIVERYER_UPDATE_REQUEST', deliveryerUpdate),
    takeLatest('@deliveryer/DELIVERYER_UPDATE_PARAMS', updateParams),
    takeLatest('@deliveryer/DELIVERYER_DELETE_REQUEST', deliveryerDelete),
]);
