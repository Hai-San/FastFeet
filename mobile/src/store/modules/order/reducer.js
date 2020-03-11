import produce from 'immer';

const INITIAL_STATE = {
    loading: false,
};

export default function order(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@order/ORDER_START_REQUEST': {
                draft.loading = true;
                break;
            }

            case '@order/ORDER_START_SUCCESS': {
                draft.loading = false;
                break;
            }

            default:
        }
    });
}
