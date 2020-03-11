import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import colors from '~/styles/colors';

import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import OrdersRoutes from './routes/orders.routes';

export default function Routes() {
    const signed = useSelector(state => state.auth.signed);

    const [statusBarParams, setStatusBarParams] = useState({
        barStyle: 'dark-content',
        backgroundColor: 'transparent',
    });

    const [lastRoute, setLastRoute] = useState(null);

    return (
        <NavigationContainer
            onStateChange={state => {
                const indexTab = state.index;
                const tab = state.routes[indexTab];
                const indexScreen = tab.state ? tab.state.index : null;
                const screen = indexScreen ? tab.state.routeNames[indexScreen] : state.routes[indexTab].name;

                if (lastRoute !== screen) {
                    setLastRoute(screen);

                    if (screen !== 'OrdersList') {
                        setStatusBarParams({
                            barStyle: 'light-content',
                            backgroundColor: colors.purple,
                        });
                    } else {
                        setStatusBarParams({
                            barStyle: 'dark-content',
                            backgroundColor: 'transparent',
                        });
                    }
                }
            }}>
            {signed ? (
                <>
                    <StatusBar {...statusBarParams} />
                    <Tab.Navigator
                        initialRouteName="Orders"
                        tabBarOptions={{
                            keyboardHidesTabBar: true,
                            activeTintColor: colors.purple,
                            inactiveTintColor: colors.gray,
                            style: {
                                paddingTop: 20,
                                paddingBottom: 12,
                                backgroundColor: colors.white,
                                height: 70,
                                shadowColor: 'red',
                            },
                            labelStyle: {
                                fontSize: 14,
                            },
                        }}>
                        <Tab.Screen
                            name="Orders"
                            options={{
                                unmountOnBlur: true,
                                tabBarLabel: 'Entregas',
                                tabBarIcon: ({ size, color }) => {
                                    return <Icon name="view-headline" size={size} color={color} />;
                                },
                            }}
                            component={OrdersRoutes}></Tab.Screen>
                        <Tab.Screen
                            name="Profile"
                            component={Profile}
                            options={{
                                tabBarLabel: 'Perfil',
                                tabBarIcon: ({ size, color }) => {
                                    return <Icon name="account-circle" size={size} color={color} />;
                                },
                            }}
                        />
                    </Tab.Navigator>
                </>
            ) : (
                <>
                    <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                    <Stack.Navigator initialRouteName="SignIn">
                        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </>
            )}
        </NavigationContainer>
    );
}
