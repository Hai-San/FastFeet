export function signInRequest(email, password) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: {
            email,
            password,
        },
    };
}

export function signInSuccess(token, user) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: {
            token,
            user,
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
