import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';

import Background from '~/components/Background';
import { Container, Title, List, Empty } from './styles';

import api from '~/services/api';
import OrderListProblem from '~/components/OrderListProblem';

export default function ProblemView({ route }) {
    const { order } = route.params;
    const [problems, setProblems] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        async function loadProblems() {
            const response = await api.get(`order/${order.id}/problems`);

            setProblems(response.data);
            setRefreshing(false);
        }
        loadProblems();
    }, [refreshing]);

    function handdleRefresh() {
        setRefreshing(true);
    }

    return (
        <Background>
            <Container>
                <Title>{order.product}</Title>

                {problems.length > 0 ? (
                    <List
                        data={problems}
                        keyExtractor={item => String(item.id)}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handdleRefresh} />}
                        renderItem={({ item }) => <OrderListProblem data={item} />}
                    />
                ) : (
                    <Empty>Nenhum problema foi registrado!</Empty>
                )}
            </Container>
        </Background>
    );
}
