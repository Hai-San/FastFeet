import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import OrderList from '../pages/OrderList';
import OrderRegister from '../pages/OrderRegister';
import OrderUpdate from '../pages/OrderUpdate';

import DeliveryerList from '../pages/DeliveryerList';
import DeliveryerRegister from '../pages/DeliveryerRegister';
import DeliveryerUpdate from '../pages/DeliveryerUpdate';

import RecipientList from '../pages/RecipientList';
import RecipientRegister from '../pages/RecipientRegister';
import RecipientUpdate from '../pages/RecipientUpdate';

import OrderProblems from '../pages/OrderProblems';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/encomendas" component={OrderList} isPrivate exact />
            <Route path="/encomendas/cadastro" component={OrderRegister} isPrivate />
            <Route path="/encomendas/editar" component={OrderUpdate} isPrivate />

            <Route path="/entregadores" component={DeliveryerList} isPrivate exact />
            <Route path="/entregadores/cadastro" component={DeliveryerRegister} isPrivate />
            <Route path="/entregadores/editar" component={DeliveryerUpdate} isPrivate />

            <Route path="/destinatarios" component={RecipientList} exact isPrivate />
            <Route path="/destinatarios/cadastro" component={RecipientRegister} isPrivate />
            <Route path="/destinatarios/editar" component={RecipientUpdate} isPrivate />

            <Route path="/problemas" component={OrderProblems} isPrivate />
        </Switch>
    );
}
