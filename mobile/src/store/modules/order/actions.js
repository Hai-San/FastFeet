export function orderStartRequest(id) {
    return {
        type: '@order/ORDER_START_REQUEST',
        payload: { id },
    };
}

export function orderStartSuccess() {
    return {
        type: '@order/ORDER_START_SUCCESS',
    };
}

export function orderFailture() {
    return {
        type: '@order/ORDER_FAILTURE',
    };
}
