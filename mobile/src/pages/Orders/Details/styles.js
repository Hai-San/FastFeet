import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 68px 20px 0px;
`;

export const Card = styled.View.attrs({
    shadowColor: colors.black,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
})`
    border-radius: 6px;
    background-color: ${colors.white};
    padding: 15px 12px;
    margin-bottom: 10px;
    border: 1px solid rgba(0, 0, 0, 0.03);
`;

export const CardHeader = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;
`;

export const CardTitle = styled.Text`
    font-size: 14px;
    font-weight: 700;
    color: ${colors.purple};
    margin-left: 10px;
`;

export const Row = styled.View`
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    font-size: 14px;
    font-weight: 700;
    color: ${colors.gray};
    text-transform: uppercase;
    margin-bottom: 3px;
`;

export const Text = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: ${colors.gray66};
`;

export const Col = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`;

export const Menu = styled.View.attrs({
    shadowColor: colors.black,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2.2,
})`
    flex-direction: row;
    align-items: stretch;
    border-radius: 6px;
    background-color: ${colors.grayf8};
`;

export const MenuButton = styled(RectButton)`
    flex: 1;
    align-items: center;
    padding: 15px 30px;
`;

export const MenuButtonText = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: ${colors.gray};
    text-align: center;
    margin-top: 3px;
`;

export const Bar = styled.View`
    width: 1px;
    background-color: rgba(0, 0, 0, 0.1);
`;
