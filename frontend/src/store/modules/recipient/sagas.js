import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { RecipientUpdateSuccess, RecipientFailture, RecipientDeleteSuccess } from './actions';

export function* recipientUpdate({ payload }) {
    try {
        const { id, ...data } = payload;

        console.tron.log(id, data);

        const UpdatedRecipient = yield call(api.put, `recipients/${id}`, data);

        toast.success('Destinatário atualizado com sucesso!');

        yield put(RecipientUpdateSuccess(UpdatedRecipient.data));
    } catch (error) {
        toast.error('Erro ao atualizar o destinatário, confira todas as informações.');
        yield put(RecipientFailture());
    }
}

export function updateParams() {
    history.push('/destinatarios/editar');
}

export function* recipientDelete({ payload }) {
    try {
        const { id } = payload;

        yield call(api.delete, `recipients/${id}`);

        toast.success('Destinatário deletado com sucesso!');
        yield put(RecipientDeleteSuccess());
    } catch (error) {
        toast.error('Erro ao deletar o destinatário');
        yield put(RecipientFailture());
    }
}

export default all([
    takeLatest('@recipient/RECIPIENT_UPDATE_REQUEST', recipientUpdate),
    takeLatest('@recipient/RECIPIENT_UPDATE_PARAMS', updateParams),
    takeLatest('@recipient/RECIPIENT_DELETE_REQUEST', recipientDelete),
]);
