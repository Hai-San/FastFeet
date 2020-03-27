import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import LinesEllipsis from 'react-lines-ellipsis';

import api from '~/services/api';
import TableOptions from './TableOptions';
import Loading from '~/components/Loading';

import { Container, Table } from '~/styles/listPages';
import { OrderStatus } from '~/styles/orderStatus';
import { PageContainer } from './styles';

export default function OrderProblems() {
    const [problems, setProblems] = useState([]);
    const [page, setPage] = useState(1);
    const [problemsCount, setProblemsCount] = useState(0);
    const perpage = 5;
    const [loading, setLoading] = useState(false);
    const reduxLoading = useSelector(state => state.order.loading);

    useEffect(() => {
        async function loadProblems() {
            setLoading(true);

            const response = await api.get('problems', {
                params: {
                    page,
                    perpage,
                },
            });

            setProblemsCount(response.data.count);

            if (response.data.rows.length <= 0 && page > 1) {
                setPage(page - 1);
                return null;
            }

            const data = response.data.rows.map(problem => {
                let status = 'pendente';

                if (problem.order.canceled_at) {
                    status = 'cancelada';
                } else if (problem.order.start_date && problem.order.end_date) {
                    status = 'entregue';
                } else if (problem.order.start_date) {
                    status = 'retirada';
                }

                problem.order.status = status;

                return { ...problem };
            });

            setProblems(data);

            setLoading(false);
        }

        loadProblems();
    }, [page, reduxLoading]);

    function handlePageClick(current) {
        setPage(current);
    }

    return (
        <PageContainer>
            <Container>
                <h1>Problemas na entrega</h1>
                <div className="table_container">
                    <Loading loading={loading} />

                    {problems.length > 0 ? (
                        <>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Encomenda</th>
                                        <th>Problema</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {problems.map(problem => (
                                        <tr key={String(problem.id)}>
                                            <td>#{problem.order.id}</td>
                                            <td>
                                                <LinesEllipsis
                                                    className="description"
                                                    text={problem.description}
                                                    maxLine={1}
                                                    ellipsis="..."
                                                    basedOn="words"
                                                />
                                            </td>
                                            <td>
                                                <OrderStatus data-status={problem.order.status}>
                                                    {problem.order.status}
                                                </OrderStatus>
                                            </td>
                                            <td>
                                                <TableOptions problem={problem} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination
                                current={page}
                                pageSize={perpage}
                                total={problemsCount}
                                onChange={handlePageClick}
                                showTitle={false}
                            />
                        </>
                    ) : (
                        !loading && <h2>Nenhum problema foi encontrado</h2>
                    )}
                </div>
            </Container>
        </PageContainer>
    );
}
