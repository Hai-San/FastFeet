import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Input from '~/components/Form/Input';
import AvatarInput from '~/components/Form/AvatarInput';
import { Container } from '~/styles/formPages';

export default function DeliveryerRegister() {
    const formRef = useRef(null);
    const [nameDeliveryer, setNameDeliveryer] = useState('');
    const [emailDeliveryer, setEmailDeliveryer] = useState('');
    const [reset, setReset] = useState(false);

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
            }

            const { name, email, avatar_id = null } = data;

            await api.post('deliveryers', {
                name,
                email,
                avatar_id,
            });

            setNameDeliveryer('');
            setEmailDeliveryer('');
            setReset(true);

            toast.success('Entregador registrado com sucesso!');

            setReset(false);
        } catch (error) {
            const validationErrors = {};
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                formRef.current.setErrors(validationErrors);
            }

            toast.error('Erro ao cadastrar o entregador, confira todas as informações.');
        }
    }

    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <header>
                    <h1>Cadastro de entregadores</h1>
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
                        <AvatarInput id="avatar" name="avatar" handdleReset={reset} />
                    </div>
                    <div className="form_container_row">
                        <Input
                            label="Nome"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome do entregador"
                            labelClass="large_label"
                            value={nameDeliveryer}
                            onChange={e => {
                                setNameDeliveryer(e.target.value);
                            }}
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
                            value={emailDeliveryer}
                            onChange={e => {
                                setEmailDeliveryer(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Form>
        </Container>
    );
}
