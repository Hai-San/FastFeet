import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar, { ConfigProvider } from 'react-avatar';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Form } from '@unform/web';
import { MdSearch, MdAdd } from 'react-icons/md';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';
import Input from '~/components/Form/Input';
import TableOptions from './TableOptions';

import { Container, Table } from '~/styles/listPages';
import { OrderStatus } from '~/styles/orderStatus';
import { PageContainer } from './styles';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState([]);
    const [page, setPage] = useState(1);
    const [ordersCount, setOrdersCount] = useState(0);
    const perpage = 5;
    const loading = useSelector(state => state.order.loading);

    useEffect(() => {
        async function loadOrders() {
            const response = await api.get('orders', {
                params: {
                    search,
                    page,
                    perpage,
                },
            });

            setOrdersCount(response.data.count);

            if (response.data.rows.length <= 0 && page > 1) {
                setPage(page - 1);
                return null;
            }

            const data = response.data.rows.map(order => {
                let status = 'pendente';

                if (order.canceled_at) {
                    status = 'cancelada';
                } else if (order.start_date && order.end_date) {
                    status = 'entregue';
                } else if (order.start_date) {
                    status = 'retirada';
                }

                if (order.canceled_at) {
                    order.canceled_at_formated = format(parseISO(order.canceled_at), 'd/MM/y');
                }

                if (order.start_date) {
                    order.start_date_formated = format(parseISO(order.start_date), 'd/MM/y');
                }

                if (order.end_date) {
                    order.end_date_formated = format(parseISO(order.end_date), 'd/MM/y');
                }

                return { ...order, status };
            });

            setOrders(data);
        }

        if (!loading) {
            loadOrders();
        }
    }, [page, search, loading]);

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

    return (
        <PageContainer>
            <div className="loadingScreen" data-loading={loading}>
                loading
            </div>
            <Container>
                <h1>Gerenciando encomendas</h1>
                <div className="page_header">
                    <Form>
                        <MdSearch size={22} />
                        <Input
                            name="search"
                            type="text"
                            placeholder="Buscar por encomendas"
                            defaultValue={search}
                            onInput={handdleSearch}
                        />
                    </Form>
                    <Link to="/encomendas/cadastro">
                        <MdAdd size={24} />
                        <span>Cadastrar</span>
                    </Link>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Destinatário</th>
                            <th>Entregador</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={String(order.id)}>
                                <td>#{order.id}</td>
                                <td>{order.recipient.name}</td>
                                <td>
                                    <div className="orderDeliveryer">
                                        {order.deliveryer.avatar ? (
                                            <div className="deliveryer_avatar">
                                                <img
                                                    src={order.deliveryer.avatar.url}
                                                    alt={order.deliveryer.name}
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
                                                    name={order.deliveryer.name}
                                                    maxInitials={2}
                                                    alt={order.deliveryer.name}
                                                />
                                            </ConfigProvider>
                                        )}

                                        <span>{order.deliveryer.name}</span>
                                    </div>
                                </td>
                                <td>{order.recipient.city}</td>
                                <td>{order.recipient.state}</td>
                                <td>
                                    <OrderStatus data-status={order.status}>
                                        {order.status}
                                    </OrderStatus>
                                </td>
                                <td>
                                    <TableOptions order={order} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination
                    current={page}
                    pageSize={perpage}
                    total={ordersCount}
                    onChange={handlePageClick}
                    showTitle={false}
                />
            </Container>
        </PageContainer>
    );
}
