import produce from 'immer';

const INITIAL_STATE = {
    data: {},
    loading: false,
};

export default function order(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@order/ORDER_DELETE_REQUEST':
            case '@order/ORDER_CANCEL_REQUEST': {
                draft.loading = true;
                break;
            }

            case '@order/ORDER_UPDATE_PARAMS':
            case '@order/ORDER_UPDATE_SUCCESS': {
                draft.data = action.payload;
                draft.loading = false;
                break;
            }

            case '@order/ORDER_DELETE_SUCCESS':
            case '@order/ORDER_CANCEL_SUCCESS':
            case '@order/ORDER_FAILTURE': {
                draft.loading = false;
                break;
            }

            default:
        }
    });
}
