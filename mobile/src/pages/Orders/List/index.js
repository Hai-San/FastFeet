import React, { useState, useCallback, useRef } from 'react';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';
import OrderListItem from '~/components/OrderListItem';

import { Container, Deliveryer, Avatar, ViewButton, Title, Name, ListHeader, ListTitle, List, Empty } from './styles';
import colors from '~/styles/colors';

const filterStyle = {
    inputIOS: {
        fontSize: 14,
        paddingHorizontal: 12,
        paddingVertical: 0,
        paddingRight: 25,
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 4,
        color: colors.gray,
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 12,
        paddingVertical: 0,
        paddingRight: 25,
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 4,
        color: colors.gray,
    },
    iconContainer: {
        top: 5,
        right: 5,
    },
};

const filterOptions = [
    {
        label: 'Todas',
        value: '',
        color: colors.purple,
    },
    {
        label: 'Pendentes',
        value: 'pending',
        color: colors.yellow,
    },
    {
        label: 'Retiradas',
        value: 'started',
        color: colors.blue,
    },
    {
        label: 'Entregues',
        value: 'delivered',
        color: colors.green,
    },
    {
        label: 'Canceladas',
        value: 'canceled',
        color: colors.red,
    },
];

export default function OrdersList({ navigation }) {
    const dispatch = useDispatch();
    const deliveryer = useSelector(state => state.auth.profile);

    const [filter, setFilter] = useState('');
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [page, setPage] = useState(1);
    const [perpage] = useState(5);
    const [totalOrders, setTotalOrders] = useState(0);
    const filterRef = useRef(null);

    async function loadOrders() {
        const response = await api.get(`deliveryer/${deliveryer.id}/orders`, {
            params: {
                status: filter,
                page,
                perpage,
            },
        });
        setTotalOrders(response.data.count);
        setOrders(page === 1 ? response.data.rows : [...orders, ...response.data.rows]);
        setRefreshing(false);
    }

    useFocusEffect(
        useCallback(() => {
            handdleLoad();
        }, [page, filter])
    );

    function handdleFilter(value) {
        if (filter !== value) {
            setFilter(value);
            setPage(1);
        }
    }

    function handdleLoad() {
        setRefreshing(true);
        loadOrders();
    }

    function handdlePagination() {
        if (totalOrders / page > perpage) {
            setPage(page + 1);
        }
    }

    function handdleLogout() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Deliveryer>
                <Avatar
                    source={{
                        uri: deliveryer.avatar
                            ? deliveryer.avatar.url
                            : `https://api.adorable.io/avatar/50/${deliveryer.name}.png`,
                    }}
                />
                <ViewButton>
                    <Title>Bem vindo de volta,</Title>
                    <Name>{deliveryer.name}</Name>
                </ViewButton>
                <RectButton onPress={handdleLogout}>
                    <Icon name="exit-to-app" size={25} color={colors.red} />
                </RectButton>
            </Deliveryer>
            <ListHeader>
                <ListTitle>Encomendas</ListTitle>

                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione um Status',
                        value: null,
                    }}
                    items={filterOptions}
                    onValueChange={value => handdleFilter(value)}
                    value={filter}
                    ref={filterRef}
                    useNativeAndroidPickerStyle={false}
                    style={filterStyle}
                    Icon={() => {
                        return <Icon name="keyboard-arrow-down" size={20} color={colors.gray} />;
                    }}
                />
            </ListHeader>

            {orders.length > 0 ? (
                <List
                    data={orders}
                    keyExtractor={item => String(item.id)}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handdleLoad} />}
                    renderItem={({ item }) => <OrderListItem data={item} navigation={navigation} />}
                    onEndReachedThreshold={0.05}
                    onEndReached={handdlePagination}
                />
            ) : (
                !refreshing && <Empty>Nenhuma encomenda registrada</Empty>
            )}
        </Container>
    );
}
