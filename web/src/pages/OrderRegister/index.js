import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';

import Input from '~/components/Form/Input';
import Select from '~/components/Form/Select';

import api from '~/services/api';
import { OrderRegisterRequest } from '~/store/modules/order/actions';
import { Container } from '~/styles/formPages';

export default function OrderRegister() {
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const [recipientOptions, setRecipientOptions] = useState([]);
    const [deliveryerOptions, setDeliveryerOptions] = useState([]);

    async function handleSubmit(data) {
        try {
            const schema = Yup.object().shape({
                product: Yup.string().required('O nome do produto é obrigatório'),
                recipient_id: Yup.string().required('Selecione o destinatário'),
                deliveryer_id: Yup.string().required('Selecione o entregador'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { product, recipient_id, deliveryer_id } = data;

            dispatch(OrderRegisterRequest(product, recipient_id, deliveryer_id));
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

    useEffect(() => {
        async function loadSelectOptions() {
            const [recipients, deliveryers] = await Promise.all([
                api.get('recipients'),
                api.get('deliveryers'),
            ]);

            setRecipientOptions(
                recipients.data.rows.map(recipient => ({
                    value: recipient.id,
                    label: recipient.name,
                }))
            );

            setDeliveryerOptions(
                deliveryers.data.rows.map(deliveryer => ({
                    value: deliveryer.id,
                    label: deliveryer.name,
                }))
            );
        }
        loadSelectOptions();
    }, []);

    async function searchRecipient(inputValue) {
        const searchRecipients = await api.get('recipients', {
            params: {
                search: inputValue,
            },
        });

        const formatSearchRecipient = searchRecipients.data.rows.map(recipient => ({
            value: recipient.id,
            label: recipient.name,
        }));

        return formatSearchRecipient;
    }

    async function searchDeliveryer(inputValue) {
        const searchDeliveryers = await api.get('deliveryers', {
            params: {
                search: inputValue,
            },
        });

        const formatSearchDeliveryer = searchDeliveryers.data.rows.map(recipient => ({
            value: recipient.id,
            label: recipient.name,
        }));

        return formatSearchDeliveryer;
    }

    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <header>
                    <h1>Cadastrar encomenda</h1>
                    <div className="form_buttons">
                        <Link to="/encomendas" className="button">
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
                        <label className="medium_Label" htmlFor="recipient">
                            <span>Destinatário</span>
                            <Select
                                id="recipient"
                                name="recipient_id"
                                defaultOptions={recipientOptions}
                                loadOptions={searchRecipient}
                                placeholder="Digite para buscar um destinatário"
                            />
                        </label>

                        <label className="medium_Label">
                            <span>Entregador</span>
                            <Select
                                id="deliveryer"
                                name="deliveryer_id"
                                defaultOptions={deliveryerOptions}
                                loadOptions={searchDeliveryer}
                                placeholder="Digite para buscar um Entregador"
                            />
                        </label>
                    </div>

                    <div className="form_container_row">
                        <Input
                            label="Nome do produto"
                            id="product_id"
                            name="product"
                            type="text"
                            placeholder="Nome do produto"
                            labelClass="large_label"
                        />
                    </div>
                </div>
            </Form>
        </Container>
    );
}
