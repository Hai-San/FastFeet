export function signInRequest(id) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: { id },
    };
}

export function signInSuccess(token, deliveryer) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: {
            token,
            deliveryer,
        },
    };
}

export function signFailture() {
    return {
        type: '@auth/SIGN_FAILTURE',
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
    };
}
