import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

import { Container } from './styles';

export default function Header() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handdleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <header className="header">
                <div className="header_left">
                    <img src={logo} alt="Gobarber" />
                    <nav>
                        <NavLink to="/encomendas">Encomendas</NavLink>
                        <NavLink to="/entregadores">Entregadores</NavLink>
                        <NavLink to="/destinatarios">Destinatários</NavLink>
                        <NavLink to="/problemas">Problemas</NavLink>
                    </nav>
                </div>

                <div className="header_right">
                    <strong>{profile.name}</strong>
                    <button type="button" onClick={handdleSignOut}>
                        Sair do sistema
                    </button>
                </div>
            </header>
        </Container>
    );
}
