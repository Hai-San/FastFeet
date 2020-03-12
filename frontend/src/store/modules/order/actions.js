export function OrderRegisterRequest(product, recipient_id, deliveryer_id) {
    return {
        type: '@order/ORDER_REGISTER_REQUEST',
        payload: { product, recipient_id, deliveryer_id },
    };
}

export function OrderRegisterSuccess() {
    return {
        type: '@order/ORDER_REGISTER_SUCCESS',
    };
}

export function OrderUpdateRequest(product, id, recipient_id, deliveryer_id) {
    return {
        type: '@order/ORDER_UPDATE_REQUEST',
        payload: { product, id, recipient_id, deliveryer_id },
    };
}

export function OrderUpdateSuccess(order) {
    return {
        type: '@order/ORDER_UPDATE_SUCCESS',
        payload: order,
    };
}

export function OrderUpdateParams(order) {
    return {
        type: '@order/ORDER_UPDATE_PARAMS',
        payload: order,
    };
}

export function OrderDeleteRequest(id) {
    return {
        type: '@order/ORDER_DELETE_REQUEST',
        payload: { id },
    };
}

export function OrderDeleteSuccess() {
    return {
        type: '@order/ORDER_DELETE_SUCCESS',
    };
}

export function OrderCancelRequest(id) {
    return {
        type: '@order/ORDER_CANCEL_REQUEST',
        payload: { id },
    };
}

export function OrderCancelSuccess() {
    return {
        type: '@order/ORDER_CANCEL_SUCCESS',
    };
}

export function OrderFailture() {
    return {
        type: '@order/ORDER_FAILTURE',
    };
}
