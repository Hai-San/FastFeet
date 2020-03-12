import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';

import Input from '~/components/Form/Input';
import AvatarInput from '~/components/Form/AvatarInput';
import { DeliveryerUpdateRequest } from '~/store/modules/deliveryer/actions';
import { Container } from '~/styles/formPages';

export default function DeliveryerUpdate() {
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const deliveryer = useSelector(state => state.deliveryer.data);
    const [originalFile, setoriginalFile] = useState(true);

    async function handleSubmit(data) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('O nome é obrigatório'),
                email: Yup.string()
                    .email()
                    .required('O e-mail é obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { avatar } = data;

            if (avatar) {
                const dataFile = new FormData();
                dataFile.append('file', avatar);
                const response = await api.post('files', dataFile);
                const { id } = response.data;
                data.avatar_id = id;
            } else if (!originalFile) {
                data.avatar_id = null;
            }

            data.id = deliveryer.id;

            dispatch(DeliveryerUpdateRequest(data));
        } catch (error) {
            const validationErrors = {};
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        }
    }

    function handdleAvatarChange(e) {
        setoriginalFile(false);
    }

    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <header>
                    <h1>Editar entregador</h1>
                    <div className="form_buttons">
                        <Link to="/entregadores" className="button">
                            <MdKeyboardArrowLeft size={24} />
                            <span>Voltar</span>
                        </Link>
                        <button type="submit" className="button">
                            <MdDone size={24} />
                            <span>Salvar</span>
                        </button>
                    </div>
                </header>
                <div className="form_container">
                    <div className="form_container_row center">
                        <AvatarInput
                            id="avatar"
                            name="avatar"
                            defaultPreview={deliveryer.avatar ? deliveryer.avatar.url : null}
                            handdleAvatarChange={handdleAvatarChange}
                        />
                    </div>
                    <div className="form_container_row">
                        <Input
                            label="Nome"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome do entregador"
                            labelClass="large_label"
                            defaultValue={deliveryer.name}
                        />
                    </div>
                    <div className="form_container_row">
                        <Input
                            label="E-mail"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="E-mail do entregador"
                            labelClass="large_label"
                            defaultValue={deliveryer.email}
                        />
                    </div>
                </div>
            </Form>
        </Container>
    );
}
