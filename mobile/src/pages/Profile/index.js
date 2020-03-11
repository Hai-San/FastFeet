import React from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

import { Container, Avatar, Row, Title, Text, LogoutButton } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
    const loading = useSelector(state => state.auth.loading);
    const deliveryer = useSelector(state => state.auth.profile);

    const createdAtFormated = format(parseISO(deliveryer.createdAt), 'dd/MM/yyyy');

    function handdleLogout() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Avatar
                source={{
                    uri: deliveryer.avatar
                        ? deliveryer.avatar.url
                        : `https://api.adorable.io/avatar/50/${deliveryer.name}.png`,
                }}
            />
            <Row>
                <Title>Nome completo</Title>
                <Text>{deliveryer.name}</Text>
            </Row>
            <Row>
                <Title>E-mail</Title>
                <Text>{deliveryer.email}</Text>
            </Row>
            <Row>
                <Title>Data de cadastro</Title>
                <Text>{createdAtFormated}</Text>
            </Row>
            <LogoutButton onPress={handdleLogout}>Sair</LogoutButton>
        </Container>
    );
}
