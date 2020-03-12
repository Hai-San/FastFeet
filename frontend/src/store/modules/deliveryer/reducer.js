import produce from 'immer';

const INITIAL_STATE = {
    data: {},
    loading: false,
};

export default function deliveryer(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@deliveryer/DELIVERYER_DELETE_REQUEST': {
                draft.loading = true;
                break;
            }

            case '@deliveryer/DELIVERYER_UPDATE_PARAMS':
            case '@deliveryer/DELIVERYER_UPDATE_SUCCESS': {
                draft.data = action.payload;
                draft.loading = false;
                break;
            }

            case '@deliveryer/DELIVERYER_DELETE_SUCCESS':
            case '@deliveryer/DELIVERYER_FAILTURE': {
                draft.loading = false;
                break;
            }

            default:
        }
    });
}
