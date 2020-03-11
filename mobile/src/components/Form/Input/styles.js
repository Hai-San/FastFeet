import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.View`
    padding: 0px 15px;
    height: 46px;
    background: ${colors.white};
    border-radius: 4px;

    flex-direction: row;
    align-items: center;
`;

export const TInput = styled.TextInput.attrs({
    placeholderTextColor: colors.gray,
})`
    flex: 1;
    font-size: 16px;
    color: ${colors.gray};
`;
