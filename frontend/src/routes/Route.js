import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({ component: Component, isPrivate, ...rest }) {
    const { signed } = store.getState().auth;

    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    }

    if (signed && !isPrivate) {
        return <Redirect to="/encomendas" />;
    }

    return (
        <Route
            {...rest}
            render={props => {
                if (signed) {
                    return (
                        <DefaultLayout>
                            <Component {...props} />
                        </DefaultLayout>
                    );
                }

                return <Component {...props} />;
            }}
        />
    );
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteWrapper.defaultProps = {
    isPrivate: false,
};
