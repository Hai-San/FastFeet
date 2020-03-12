import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import OrderList from '../pages/Order/List';
import OrderRegister from '../pages/Order/Register';
import OrderUpdate from '../pages/Order/Update';
import OrderProblems from '../pages/Order/Problems/';

import DeliveryerList from '../pages/Deliveryer/List';
import DeliveryerRegister from '../pages/Deliveryer/Register';
import DeliveryerUpdate from '../pages/Deliveryer/Update';

import RecipientList from '../pages/Recipient/List';
import RecipientRegister from '../pages/Recipient/Register';
import RecipientUpdate from '../pages/Recipient/Update';

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
