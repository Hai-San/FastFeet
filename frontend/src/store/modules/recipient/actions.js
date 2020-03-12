export function RecipientUpdateRequest(data) {
    return {
        type: '@recipient/RECIPIENT_UPDATE_REQUEST',
        payload: data,
    };
}

export function RecipientUpdateSuccess(data) {
    return {
        type: '@recipient/RECIPIENT_UPDATE_SUCCESS',
        payload: data,
    };
}

export function RecipientDeleteRequest(id) {
    return {
        type: '@recipient/RECIPIENT_DELETE_REQUEST',
        payload: { id },
    };
}

export function RecipientDeleteSuccess() {
    return {
        type: '@recipient/RECIPIENT_DELETE_SUCCESS',
    };
}

export function RecipientUpdateParams(data) {
    return {
        type: '@recipient/RECIPIENT_UPDATE_PARAMS',
        payload: data,
    };
}

export function RecipientFailture() {
    return {
        type: '@recipient/RECIPIENT_FAILTURE',
    };
}
