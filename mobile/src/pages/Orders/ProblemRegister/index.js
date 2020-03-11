import React, { useState, useRef } from 'react';
import { Keyboard } from 'react-native';

import api from '~/services/api';
import Background from '~/components/Background';
import { Container, Input, SendButton } from './styles';

export default function ProblemRegister({ route, navigation }) {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const { order } = route.params;
    const textRef = useRef();

    async function handdleSubmit() {
        setLoading(true);

        const response = await api.post(`order/${order.id}/problems`, { description });

        if (response.data) {
            setDescription('');
            navigation.pop(1);
        }

        setLoading(false);
    }

    return (
        <Background>
            <Container>
                <Input
                    maxLength={255}
                    autoCorrect={false}
                    numberOfLines={10}
                    multiline={true}
                    placeholder="Inclua aqui o problema que ocorreu na
                    entrega."
                    ref={textRef}
                    autoFocus={true}
                    returnKeyType="send"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                        handdleSubmit();
                    }}
                    value={description}
                    blurOnSubmit={true}
                    onChangeText={text => setDescription(text)}
                />
                <SendButton loading={loading} onPress={handdleSubmit} children="Enviar" />
            </Container>
        </Background>
    );
}
