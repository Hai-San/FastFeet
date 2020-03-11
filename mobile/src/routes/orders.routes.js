import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AppointmentStack = createStackNavigator();

import OrdersList from '~/pages/Orders/List';
import OrderDetails from '~/pages/Orders/Details';
import OrderConfirm from '~/pages/Orders/Confirm';
import ProblemRegister from '~/pages/Orders/ProblemRegister';
import ProblemView from '~/pages/Orders/ProblemView';

export default function OrdersRoutes({ navigation }) {
    return (
        <AppointmentStack.Navigator
            initialRouteName="OrdersList"
            screenOptions={{
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                headerLeftContainerStyle: {
                    marginLeft: 20,
                },
            }}>
            <AppointmentStack.Screen
                name="OrdersList"
                component={OrdersList}
                options={{
                    headerShown: false,
                }}
            />
            <AppointmentStack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    title: 'Detalhes da encomenda',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.dispatch(StackActions.pop(1));
                            }}>
                            <Icon name="chevron-left" size={20} color="#FFF" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <AppointmentStack.Screen
                name="OrderConfirm"
                component={OrderConfirm}
                options={{
                    title: 'Confirmar Entrega',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.dispatch(StackActions.pop(1));
                            }}>
                            <Icon name="chevron-left" size={20} color="#FFF" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <AppointmentStack.Screen
                name="ProblemRegister"
                component={ProblemRegister}
                options={{
                    title: 'Informar problema',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.dispatch(StackActions.pop(1));
                            }}>
                            <Icon name="chevron-left" size={20} color="#FFF" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <AppointmentStack.Screen
                name="ProblemView"
                component={ProblemView}
                options={{
                    title: 'Visualizar problemas',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.dispatch(StackActions.pop(1));
                            }}>
                            <Icon name="chevron-left" size={20} color="#FFF" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </AppointmentStack.Navigator>
    );
}
