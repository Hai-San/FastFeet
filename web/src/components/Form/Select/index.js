import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

export default function Select({ name, ...rest }) {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: 'state.value',
            getValue: ref => {
                if (rest.isMulti) {
                    if (!ref.select.state.value) {
                        return [];
                    }
                    return ref.select.state.value.map(({ OptionTypeBase: option }) => option.value);
                }

                if (!ref.select.state.value) {
                    return '';
                }

                return ref.select.state.value.value;
            },
        });
    }, [fieldName, registerField, rest.isMulti]);

    return (
        <>
            <AsyncSelect
                id={fieldName}
                ref={selectRef}
                defaultValue={defaultValue}
                classNamePrefix={fieldName}
                {...rest}
            />
            {error && <span className="error">{error}</span>}
        </>
    );
}

Select.propTypes = {
    name: PropTypes.string,
};

Select.defaultProps = {
    name: '',
};
