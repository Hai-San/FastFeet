import styled from 'styled-components/native';
import Button from '~/components/Form/Button';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    padding: 65px 20px 0px;
    background-color: ${colors.white};
`;

export const Avatar = styled.Image`
    width: 136px;
    height: 136px;
    border-radius: 68px;
    margin-bottom: 40px;
`;

export const Row = styled.View`
    width: 100%;
    align-items: flex-start;
    margin-bottom: 15px;
`;

export const Title = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: ${colors.gray66};
`;

export const Text = styled.Text`
    font-size: 22px;
    font-weight: 700;
    color: ${colors.gray44};
`;

export const LogoutButton = styled(Button)`
    width: 100%;
    margin-top: 15px;
    background: ${colors.red};
`;
