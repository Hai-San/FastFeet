import React, { useState, useLayoutEffect } from 'react';
import { Alert, YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO, isValid } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

import { orderStartRequest } from '~/store/modules/order/actions';

import Background from '~/components/Background';
import {
    Container,
    Card,
    CardHeader,
    CardTitle,
    Row,
    Title,
    Text,
    Col,
    Menu,
    MenuButton,
    MenuButtonText,
    Bar,
} from './styles';
import colors from '~/styles/colors';

export default function OrderDetails({ route, navigation }) {
    const dispatch = useDispatch();

    function formatDate(date) {
        if (date) {
            if (isValid(parseISO(date))) {
                return format(parseISO(date), 'dd/MM/yyyy');
            } else {
                return format(date, 'dd/MM/yyyy');
            }
        } else {
            return '--/--/--';
        }
    }

    function getStatus() {
        if (order.canceled_at) {
            return 'Cancelada';
        } else if (order.end_date) {
            return 'Entregue';
        } else if (order.start_date) {
            return 'Em Trânsito';
        } else {
            return 'Pendente';
        }
    }

    const [order, setOrder] = useState(route.params.order);
    const [status, setStatus] = useState(getStatus());
    const [startDate, setStartDate] = useState(formatDate(order.start_date));
    const [endDate, setEndDate] = useState(formatDate(order.end_date));

    useLayoutEffect(() => {
        navigation.setOptions({
            order,
        });

        setStartDate(formatDate(new Date()));
        setStatus(getStatus());
    }, [order]);

    function handdleStart() {
        Alert.alert(
            'Iniciar Entrega',
            'Você tem certeza que deseja iniciar esta entrega?',
            [
                {
                    text: 'Voltar',
                    style: 'cancel',
                },
                {
                    text: 'Iniciar',
                    onPress: () => {
                        dispatch(orderStartRequest(order.id));

                        setOrder({
                            ...order,
                            start_date: new Date(),
                        });
                    },
                },
            ],
            { cancelable: true }
        );
    }

    return (
        <Background>
            <Container>
                <Card>
                    <CardHeader>
                        <Icon name="truck" size={20} color={colors.purple} />
                        <CardTitle>Informações de entrega</CardTitle>
                    </CardHeader>
                    <Row>
                        <Title>Destinatário</Title>
                        <Text>{order.recipient.name}</Text>
                    </Row>
                    <Row>
                        <Title>Endereço de entrega</Title>
                        <Text>
                            {`${order.recipient.address}, ${order.recipient.address_number}, ${order.recipient.city} - ${order.recipient.state}, ${order.recipient.zip_code}`}
                        </Text>
                    </Row>
                    <Row>
                        <Title>Produto</Title>
                        <Text>{order.product}</Text>
                    </Row>
                </Card>
                <Card>
                    <CardHeader>
                        <Icon name="calendar-today" size={16} color={colors.purple} />
                        <CardTitle>Situação da entrega</CardTitle>
                    </CardHeader>
                    <Row>
                        <Title>Status</Title>
                        <Text>{status}</Text>
                    </Row>
                    <Col>
                        <Row>
                            <Title>Data de retirada</Title>
                            <Text>{startDate}</Text>
                        </Row>
                        <Row>
                            <Title>Data de entrega</Title>
                            <Text>{endDate}</Text>
                        </Row>
                    </Col>
                </Card>
                {!order.end_date && (
                    <Menu>
                        {!order.canceled_at && order.start_date ? (
                            <>
                                <MenuButton onPress={() => navigation.navigate('ProblemRegister', { order })}>
                                    <Icon name="close-circle-outline" size={20} color={colors.red} />
                                    <MenuButtonText>Informar problema</MenuButtonText>
                                </MenuButton>
                                <Bar />
                            </>
                        ) : null}

                        {order.canceled_at || order.start_date ? (
                            <MenuButton onPress={() => navigation.navigate('ProblemView', { order })}>
                                <Icon name="information-outline" size={20} color={colors.yellow} />
                                <MenuButtonText>Visualizar problemas</MenuButtonText>
                            </MenuButton>
                        ) : null}

                        {order.start_date && !order.canceled_at ? (
                            <>
                                <Bar />
                                <MenuButton
                                    onPress={() =>
                                        navigation.navigate('OrderConfirm', { order, parentKey: route.key })
                                    }>
                                    <Icon name="check-circle-outline" size={20} color={colors.purple} />
                                    <MenuButtonText>Confirmar entrega</MenuButtonText>
                                </MenuButton>
                            </>
                        ) : !order.canceled_at ? (
                            <MenuButton onPress={handdleStart}>
                                <Icon name="play-circle-outline" size={20} color={colors.green} />
                                <MenuButtonText>Iniciar entrega</MenuButtonText>
                            </MenuButton>
                        ) : null}
                    </Menu>
                )}
            </Container>
        </Background>
    );
}
