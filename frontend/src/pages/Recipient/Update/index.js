import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import * as Yup from 'yup';

import Input from '~/components/Form/Input';
import InputMask from '~/components/Form/InputMask';
import { RecipientUpdateRequest } from '~/store/modules/recipient/actions';
import { Container } from '~/styles/formPages';

export default function RecipientRegister() {
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const recipient = useSelector(state => state.recipient.data);
    const loading = useSelector(state => state.recipient.loading);

    async function handleSubmit(data) {
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

            response.id = recipient.id;

            dispatch(RecipientUpdateRequest(response));
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

    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <header>
                    <h1>Editar destinatário</h1>
                    <div className="form_buttons">
                        <Link to="/destinatarios" className="button">
                            <MdKeyboardArrowLeft size={24} />
                            <span>Voltar</span>
                        </Link>
                        <button type="submit" className="button" disabled={loading}>
                            {loading ? (
                                <AiOutlineLoading3Quarters size={24} />
                            ) : (
                                <>
                                    <MdDone size={24} />
                                    <span>Salvar</span>
                                </>
                            )}
                        </button>
                    </div>
                </header>
                <div className="form_container" data-loading={loading}>
                    <div className="form_container_row">
                        <Input
                            label="Nome"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome do destinatário"
                            labelClass="large_label"
                            defaultValue={recipient.name}
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
                            defaultValue={recipient.address}
                        />
                        <Input
                            label="Número"
                            id="address_number"
                            name="address_number"
                            type="number"
                            placeholder="Número"
                            labelClass="small_label"
                            defaultValue={recipient.address_number}
                        />
                        <Input
                            label="Complemento"
                            id="complement"
                            name="complement"
                            type="text"
                            placeholder="Complemento"
                            labelClass="small_label"
                            defaultValue={recipient.complement}
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
                            defaultValue={recipient.city}
                        />
                        <Input
                            label="Estado"
                            id="state"
                            name="state"
                            type="text"
                            placeholder="Estado"
                            labelClass="small_label--big"
                            defaultValue={recipient.state}
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
                            defaultValue={recipient.zip_code}
                        />
                    </div>
                </div>
            </Form>
        </Container>
    );
}
