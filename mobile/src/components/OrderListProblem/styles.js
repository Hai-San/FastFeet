import styled from 'styled-components/native';
import colors from '~/styles/colors';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    align-items: center;
`;

export const OpenModal = styled(RectButton).attrs({
    shadowColor: colors.black,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
})`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 17px 19px;
    background-color: ${colors.white};
    border-radius: 4px;
    overflow: hidden;
`;

export const Excerpt = styled.Text`
    flex: 2;
    font-size: 16px;
    font-weight: 400;
    color: ${colors.gray};
`;

export const Date = styled.Text`
    flex: 1;
    font-size: 16px;
    font-weight: 400;
    color: ${colors.gray};
    text-align: right;
`;

export const ModalBox = styled.View``;

export const Description = styled.Text`
    padding: 17px 19px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    color: ${colors.gray};
    background-color: ${colors.white};
`;

export const CloseModal = styled(RectButton)`
    margin-top: 10px;
    align-self: flex-end;
    padding: 5px 10px;
    border-radius: 4px;
    background-color: ${colors.blue};
`;

export const CloseModal2 = styled.Button`
    margin-top: 10px;
    align-self: flex-end;
`;

export const CloseModalText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: ${colors.white};
`;
