export function DeliveryerUpdateRequest(data) {
    return {
        type: '@deliveryer/DELIVERYER_UPDATE_REQUEST',
        payload: data,
    };
}

export function DeliveryerUpdateSuccess(data) {
    return {
        type: '@deliveryer/DELIVERYER_UPDATE_SUCCESS',
        payload: data,
    };
}

export function DeliveryerDeleteRequest(id) {
    return {
        type: '@deliveryer/DELIVERYER_DELETE_REQUEST',
        payload: { id },
    };
}

export function DeliveryerDeleteSuccess() {
    return {
        type: '@deliveryer/DELIVERYER_DELETE_SUCCESS',
    };
}

export function DeliveryerUpdateParams(data) {
    return {
        type: '@deliveryer/DELIVERYER_UPDATE_PARAMS',
        payload: data,
    };
}

export function DeliveryerFailture() {
    return {
        type: '@deliveryer/DELIVERYER_FAILTURE',
    };
}
