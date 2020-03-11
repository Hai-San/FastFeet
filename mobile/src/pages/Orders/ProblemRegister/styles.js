import styled from 'styled-components/native';
import Button from '~/components/Form/Button';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: flex-start;
    padding: 68px 20px 0px;
`;

export const Input = styled.TextInput.attrs({
    shadowColor: colors.black,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    textAlignVertical: 'top',
    underlineColorAndroid: colors.white,
})`
    flex: 1;
    padding: 20px;
    background-color: ${colors.white};
    max-height: 300px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    color: ${colors.gray};
`;

export const SendButton = styled(Button)`
    margin-top: 20px;
    background: ${colors.purple};
    height: 45px;
`;
