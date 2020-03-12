import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
    OrderRegisterSuccess,
    OrderUpdateSuccess,
    OrderFailture,
    OrderDeleteSuccess,
    OrderCancelSuccess,
} from './actions';

export function* orderRegister({ payload }) {
    try {
        const { product, recipient_id, deliveryer_id } = payload;

        yield call(api.post, 'orders', {
            product,
            recipient_id,
            deliveryer_id,
        });

        toast.success('Encomenda registrada com sucesso!');

        yield put(OrderRegisterSuccess());
    } catch (error) {
        toast.error('Erro ao cadastrar a encomenda, confira todas as informações.');
        yield put(OrderFailture());
    }
}

export function* orderUpdate({ payload }) {
    try {
        const { product, id, recipient_id, deliveryer_id } = payload;

        const UpdatedOrder = yield call(api.put, `orders/${id}`, {
            product,
            recipient_id,
            deliveryer_id,
        });

        toast.success('Encomenda atualizada com sucesso!');

        yield put(OrderUpdateSuccess(UpdatedOrder.data));
    } catch (error) {
        toast.error('Erro ao editar a encomenda, confira todas as informações.');
        yield put(OrderFailture());
    }
}

export function updateParams() {
    history.push('/encomendas/editar');
}

export function* orderDelete({ payload }) {
    try {
        const { id } = payload;

        yield call(api.delete, `orders/${id}`);

        toast.success('Encomenda deletada com sucesso!');
        yield put(OrderDeleteSuccess());
    } catch (error) {
        toast.error('Erro ao deletar a encomenda');
        yield put(OrderFailture());
    }
}

export function* orderCancel({ payload }) {
    try {
        const { id } = payload;

        yield call(api.put, `/problem/${id}/cancel-order`);

        toast.success('Encomenda cancelada com sucesso!');
        yield put(OrderCancelSuccess());
    } catch (error) {
        toast.error('Erro ao cancelar a encomenda');
        yield put(OrderFailture());
    }
}

export default all([
    takeLatest('@order/ORDER_REGISTER_REQUEST', orderRegister),
    takeLatest('@order/ORDER_UPDATE_REQUEST', orderUpdate),
    takeLatest('@order/ORDER_UPDATE_PARAMS', updateParams),
    takeLatest('@order/ORDER_DELETE_REQUEST', orderDelete),
    takeLatest('@order/ORDER_CANCEL_REQUEST', orderCancel),
]);
