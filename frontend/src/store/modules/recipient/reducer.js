import produce from 'immer';

const INITIAL_STATE = {
    data: {},
    loading: false,
};

export default function recipient(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@recipient/RECIPIENT_UPDATE_REQUEST':
            case '@recipient/RECIPIENT_DELETE_REQUEST': {
                draft.loading = true;
                break;
            }

            case '@recipient/RECIPIENT_UPDATE_PARAMS':
            case '@recipient/RECIPIENT_UPDATE_SUCCESS': {
                draft.data = action.payload;
                draft.loading = false;
                break;
            }

            case '@recipient/RECIPIENT_DELETE_SUCCESS':
            case '@recipient/RECIPIENT_FAILTURE': {
                draft.loading = false;
                break;
            }

            default:
        }
    });
}
