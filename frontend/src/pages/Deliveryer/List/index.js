import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar, { ConfigProvider } from 'react-avatar';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Form } from '@unform/web';
import { MdSearch, MdAdd } from 'react-icons/md';

import api from '~/services/api';
import Input from '~/components/Form/Input';
import TableOptions from './TableOptions';
import {
    DeliveryerUpdateParams,
    DeliveryerDeleteRequest,
} from '~/store/modules/deliveryer/actions';

import { Container, Table } from '~/styles/listPages';
import { PageContainer } from './styles';

export default function DeliveryerList() {
    const dispatch = useDispatch();
    const [deliveryers, setDeliveryers] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [search, setSearch] = useState([]);
    const [page, setPage] = useState(1);
    const [deliveryersCount, setDeliveryersCount] = useState(0);
    const perpage = 5;
    const loading = useSelector(state => state.deliveryer.loading);

    useEffect(() => {
        async function loadDeliveryers() {
            const response = await api.get('deliveryers', {
                params: {
                    search,
                    page,
                    perpage,
                },
            });

            setDeliveryersCount(response.data.count);

            if (response.data.rows.length > 0) {
                setEmpty(false);
                setDeliveryers(response.data.rows);
            } else {
                if (page > 1) {
                    setPage(page - 1);
                    return null;
                }

                setEmpty(true);
                setDeliveryers([]);
            }
        }

        if (!loading) {
            loadDeliveryers();
        }
    }, [page, search, loading]);

    function handlePageClick(current) {
        setPage(current);
    }

    async function handdleSearch(e) {
        if (search !== e.target.value) {
            setSearch(e.target.value);
        }

        if (page !== 1) {
            setPage(1);
        }
    }

    function handdleEdit(deliveryer) {
        dispatch(DeliveryerUpdateParams(deliveryer));
    }

    async function handdleDelete(deliveryer) {
        if (window.confirm(`Você realmente quer deletar o entregador ${deliveryer.name}?`)) {
            dispatch(DeliveryerDeleteRequest(deliveryer.id));
        }
    }

    return (
        <PageContainer>
            <div className="loadingScreen" data-loading={loading}>
                loading
            </div>
            <Container>
                <h1>Gerenciando entregadores</h1>
                <div className="page_header">
                    {!empty || search.length > 0 ? (
                        <Form>
                            <MdSearch size={22} />
                            <Input
                                name="search"
                                type="text"
                                placeholder="Buscar por entregadores"
                                defaultValue={search}
                                onInput={handdleSearch}
                            />
                        </Form>
                    ) : (
                        empty && <h2>Nenhum entregador foi cadastrado</h2>
                    )}
                    <Link to="/entregadores/cadastro">
                        <MdAdd size={24} />
                        <span>Cadastrar</span>
                    </Link>
                </div>
                {deliveryers.length > 0 ? (
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Foto</th>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveryers.map(deliveryer => (
                                    <tr key={String(deliveryer.id)}>
                                        <td>#{deliveryer.id}</td>
                                        <td>
                                            <div className="orderDeliveryer">
                                                {deliveryer.avatar ? (
                                                    <div className="deliveryer_avatar">
                                                        <img
                                                            src={deliveryer.avatar.url}
                                                            alt={deliveryer.name}
                                                        />
                                                    </div>
                                                ) : (
                                                    <ConfigProvider
                                                        colors={[
                                                            '#F4EFFC',
                                                            '#FCF4EE',
                                                            '#EBFBFA',
                                                            '#FFEEF1',
                                                            '#F4F9EF',
                                                        ]}>
                                                        <Avatar
                                                            fgColor="#777777"
                                                            size="35"
                                                            name={deliveryer.name}
                                                            maxInitials={2}
                                                            alt={deliveryer.name}
                                                        />
                                                    </ConfigProvider>
                                                )}
                                            </div>
                                        </td>
                                        <td>{deliveryer.name}</td>
                                        <td>{deliveryer.email}</td>
                                        <td>
                                            <TableOptions
                                                fcEdit={() => handdleEdit(deliveryer)}
                                                fcDelete={() => handdleDelete(deliveryer)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination
                            current={page}
                            pageSize={perpage}
                            total={deliveryersCount}
                            onChange={handlePageClick}
                            showTitle={false}
                        />
                    </>
                ) : (
                    empty && search.length > 0 && <h2>Sua busca não retornou nenhum resultado</h2>
                )}
            </Container>
        </PageContainer>
    );
}
