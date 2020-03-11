import { Platform } from 'react-native';
import styled from 'styled-components/native';
import colors from '~/styles/colors';

import Input from '~/components/Form/Input';
import Button from '~/components/Form/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
    enabled: Platform.OS === 'iso',
    behavior: 'padding',
})`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    background-color: ${colors.purple};
`;

export const Form = styled.View`
    align-self: stretch;
    margin-top: 50px;
`;

export const FormInput = styled(Input)`
    margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 5px;
    background-color: ${colors.greenLight};
`;
