import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';

import {
    Container,
    Header,
    Name,
    OrderProgress,
    OrderProgressItem,
    OrderProgressRow,
    OrderProgressItemCircle,
    OrderProgressItemText,
    OrderData,
    OrderDataItem,
    OrderDataTitle,
    OrderDataText,
    ButtonViewOrderText,
    OrderCanceled,
} from './styles';

export default function OrderListItem({ data: order, navigation }) {
    const createdAtFormated = useMemo(() => {
        return format(parseISO(order.createdAt), 'dd/MM/y');
    }, [order.createdAt]);

    return (
        <Container>
            <Header>
                <Icon name="local-shipping" size={16} color={colors.purple} />
                <Name>{order.product}</Name>
                {order.canceled_at && <OrderCanceled>Cancelada</OrderCanceled>}
            </Header>
            {order.canceled_at === null ? (
                <OrderProgress>
                    <OrderProgressItem>
                        <OrderProgressItemCircle status={true}></OrderProgressItemCircle>
                        <OrderProgressItemText>Aguardando Retirada</OrderProgressItemText>
                    </OrderProgressItem>

                    <OrderProgressItem>
                        <OrderProgressRow />
                        <OrderProgressItemCircle
                            status={order.start_date !== null ? true : false}></OrderProgressItemCircle>
                        <OrderProgressItemText>Retirada</OrderProgressItemText>
                    </OrderProgressItem>

                    <OrderProgressItem>
                        <OrderProgressRow />
                        <OrderProgressItemCircle
                            status={order.end_date !== null ? true : false}></OrderProgressItemCircle>
                        <OrderProgressItemText>Entregue</OrderProgressItemText>
                    </OrderProgressItem>
                </OrderProgress>
            ) : null}
            <OrderData>
                <OrderDataItem>
                    <OrderDataTitle>Data</OrderDataTitle>
                    <OrderDataText>{createdAtFormated}</OrderDataText>
                </OrderDataItem>
                <OrderDataItem>
                    <OrderDataTitle>Cidade</OrderDataTitle>
                    <OrderDataText>{order.recipient.city}</OrderDataText>
                </OrderDataItem>
                <RectButton onPress={() => navigation.navigate('OrderDetails', { order })}>
                    <ButtonViewOrderText>Ver detalhes</ButtonViewOrderText>
                </RectButton>
            </OrderData>
        </Container>
    );
}
