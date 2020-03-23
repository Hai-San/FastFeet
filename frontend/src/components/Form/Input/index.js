import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

export default function Input({ id, name, label, labelClass, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <label htmlFor={id} className={labelClass}>
            {label && <span>{label}</span>}
            <input id={id} name={name} ref={inputRef} defaultValue={defaultValue} {...rest} />
            {error && <span className="error">{error}</span>}
        </label>
    );
}

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    labelClass: PropTypes.string,
};

Input.defaultProps = {
    id: '',
    name: '',
    label: '',
    labelClass: '',
};
