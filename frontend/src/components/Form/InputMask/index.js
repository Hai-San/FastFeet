import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

export default function Input({ id, name, label, labelClass, mask, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'target.value',
            getValue: ref => {
                return ref.value;
            },
        });
    }, [fieldName, registerField]);

    return (
        <label htmlFor={id} className={labelClass}>
            {label && <span>{label}</span>}
            <InputMask mask={mask} id={id} name={name} ref={inputRef} {...rest} />
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
