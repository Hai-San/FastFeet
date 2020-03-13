import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import Input from '~/components/Form/Input';
import InputMask from '~/components/Form/InputMask';
import { Container } from '~/styles/formPages';

export default function RecipientRegister() {
    const formRef = useRef(null);

    async function handleSubmit(data, { reset }) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('O nome é obrigatório'),
                address: Yup.string().required('O endereço é obrigatório'),
                address_number: Yup.number()
                    .nullable(true)
                    .transform(value => (isNaN(value) ? null : value))
                    .required('O número é obrigatório'),
                complement: Yup.string(),
                city: Yup.string().required('A cidade é obrigatória'),
                state: Yup.string().required('O estado é obrigatório'),
                zip_code: Yup.number()
                    .transform((value, originalvalue) => {
                        if (originalvalue) {
                            return parseInt(originalvalue.replace(/\D/g, ''));
                        } else {
                            return undefined;
                        }
                    })
                    .min(8, 'Este CEP não existe')
                    .required('O CEP é obrigatório'),
            });

            const response = await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('recipients', response);

            formRef.current.reset();

            toast.success('Destinatário registrado com sucesso!');
        } catch (error) {
            const validationErrors = {};
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                formRef.current.setErrors(validationErrors);
            }

            toast.error('Erro ao cadastrar o destinatário, confira todas as informações.');
        }
    }

    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <header>
                    <h1>Cadastro de destinatário</h1>
                    <div className="form_buttons">
                        <Link to="/destinatarios" className="button">
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
                    <div className="form_container_row">
                        <Input
                            label="Nome"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome do destinatário"
                            labelClass="large_label"
                        />
                    </div>
                    <div className="form_container_row">
                        <Input
                            label="Endereço"
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Endereço"
                            labelClass="medium_Label--big"
                        />
                        <Input
                            label="Número"
                            id="address_number"
                            name="address_number"
                            type="number"
                            placeholder="Número"
                            labelClass="small_label"
                        />
                        <Input
                            label="Complemento"
                            id="complement"
                            name="complement"
                            type="text"
                            placeholder="Complemento"
                            labelClass="small_label"
                        />
                    </div>
                    <div className="form_container_row">
                        <Input
                            label="Cidade"
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Cidade"
                            labelClass="small_label--big"
                        />
                        <Input
                            label="Estado"
                            id="state"
                            name="state"
                            type="text"
                            placeholder="Estado"
                            labelClass="small_label--big"
                        />
                        <InputMask
                            label="CEP"
                            id="zip_code"
                            name="zip_code"
                            type="text"
                            placeholder="CEP"
                            labelClass="small_label--big"
                            mask="99.999-999"
                            maskChar={null}
                        />
                    </div>
                </div>
            </Form>
        </Container>
    );
}
