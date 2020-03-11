import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Form } from '@unform/web';
import { MdSearch, MdAdd } from 'react-icons/md';

import api from '~/services/api';
import Input from '~/components/Form/Input';
import TableOptions from './TableOptions';
import { RecipientUpdateParams, RecipientDeleteRequest } from '~/store/modules/recipient/actions';

import { Container, Table } from '~/styles/listPages';
import { PageContainer } from './styles';

export default function RecipientList() {
    const dispatch = useDispatch();
    const [recipients, setRecipients] = useState([]);
    const [search, setSearch] = useState([]);
    const [page, setPage] = useState(1);
    const [RecipientCount, setRecipientsCount] = useState(0);
    const perpage = 5;
    const loading = useSelector(state => state.recipient.loading);

    useEffect(() => {
        async function loadRecipients() {
            const response = await api.get('recipients', {
                params: {
                    search,
                    page,
                    perpage,
                },
            });

            setRecipientsCount(response.data.count);

            if (response.data.rows.length <= 0 && page > 1) {
                setPage(page - 1);
                return null;
            }

            const data = response.data.rows.map(recipient => {
                const zip_code_formated = zipcode_format(recipient.zip_code.toString());

                return { ...recipient, zip_code_formated };
            });

            setRecipients(data);
        }

        if (!loading) {
            loadRecipients();
        }
    }, [page, search, loading]);

    function zipcode_format(code) {
        var regex = /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/;
        return code.replace(regex, '$1.$2-$3');
    }

    function handlePageClick(current) {
        setPage(current);
    }

    async function handdleSearch(e) {
        if (search != e.target.value) {
            setSearch(e.target.value);
        }

        if (page != 1) {
            setPage(1);
        }
    }

    function handdleEdit(recipient) {
        dispatch(RecipientUpdateParams(recipient));
    }

    async function handdleDelete(recipient) {
        if (window.confirm(`Você realmente quer deletar o destinatário ${recipient.name}?`)) {
            dispatch(RecipientDeleteRequest(recipient.id));
        }
    }

    return (
        <PageContainer>
            <div className="loadingScreen" data-loading={loading}>
                loading
            </div>
            <Container>
                <h1>Gerenciando destinatários</h1>
                <div className="page_header">
                    <Form>
                        <MdSearch size={22} />
                        <Input
                            name="search"
                            type="text"
                            placeholder="Buscar por destinatários"
                            defaultValue={search}
                            onInput={handdleSearch}
                        />
                    </Form>
                    <Link to="/destinatarios/cadastro">
                        <MdAdd size={24} />
                        <span>Cadastrar</span>
                    </Link>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipients.map(recipient => (
                            <tr key={String(recipient.id)}>
                                <td>#{recipient.id}</td>
                                <td>{recipient.name}</td>
                                <td>{`${recipient.address}, ${recipient.address_number}, ${recipient.zip_code_formated}, ${recipient.city} - ${recipient.state}`}</td>
                                <td>
                                    <TableOptions
                                        fcEdit={() => handdleEdit(recipient)}
                                        fcDelete={() => handdleDelete(recipient)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination
                    current={page}
                    pageSize={perpage}
                    total={RecipientCount}
                    onChange={handlePageClick}
                    showTitle={false}
                />
            </Container>
        </PageContainer>
    );
}
