import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '~/components/Form/Input';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

import { SignInPage, Container } from './styles';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }

    return (
        <SignInPage>
            <Container>
                <img src={logo} alt="FastFeet" />
                <Form schema={schema} onSubmit={handleSubmit}>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Seu E-mail"
                        placeholder="exemplo@email.com"
                    />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        label="Sua senha"
                        placeholder="********"
                    />

                    <button type="submit">{loading ? 'Carregando...' : 'Entrar no sistema'}</button>
                </Form>
            </Container>
        </SignInPage>
    );
}
