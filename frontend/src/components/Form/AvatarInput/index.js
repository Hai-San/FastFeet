import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useField } from '@unform/core';

import { MdPhoto, MdClear } from 'react-icons/md';

export default function AvatarInput({
    id,
    name,
    handdleAvatarChange = null,
    defaultValue,
    ...rest
}) {
    const ref = useRef(null);
    const { fieldName, registerField } = useField(name);
    const [preview, setPreview] = useState(defaultValue);

    const handdlePreview = useCallback(e => {
        const uploadFile = e.target.files?.[0];

        if (uploadFile) {
            let reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result);
            };

            reader.readAsDataURL(uploadFile);
        } else {
            setPreview(null);
        }
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'files[0]',
            clearValue(ref) {
                ref.value = '';
                setPreview(null);
            },
            setValue(_, value) {
                setPreview(value);
            },
        });
    }, [fieldName, registerField]);

    function handdleRemoveAvatar() {
        setPreview(null);
        const input = document.getElementById(id);
        input.value = '';

        var manualOnChange = document.createEvent('UIEvents');
        manualOnChange.initUIEvent('change', true, true);
        input.dispatchEvent(manualOnChange);
    }

    return (
        <div className="avatar">
            <label className="avatar_image" htmlFor={id}>
                <div className="avatar_image_none">
                    <MdPhoto size={40} color="#DDDDDD" />
                    <span>Adicionar foto</span>
                </div>
                <img className="avatar_image_preview" src={preview} alt="" />
                <input
                    id={id}
                    className="avatar_input"
                    name={name}
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        handdlePreview(e);
                        if (typeof handdleAvatarChange == 'function') {
                            handdleAvatarChange(e);
                        }
                    }}
                    ref={ref}
                    {...rest}
                />
            </label>
            {preview && (
                <button className="avatar_image_remove" type="button" onClick={handdleRemoveAvatar}>
                    <MdClear size={28} />
                </button>
            )}
        </div>
    );
}
