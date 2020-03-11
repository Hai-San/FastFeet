import styled, { css } from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.View.attrs({
    shadowColor: colors.black,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
})`
    margin-bottom: 30px;
    background-color: ${colors.white};
    border: 1px solid rgba(0, 0, 0, 0.03);
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 15px 15px 24px;
`;

export const Name = styled.Text`
    font-size: 14px;
    font-weight: 700;
    margin-left: 10px;
    color: ${colors.purple};
`;

export const OrderProgress = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 22px;
`;

export const OrderProgressItem = styled.View`
    position: relative;
    align-items: center;
`;

export const OrderProgressItemCircle = styled.View`
    width: 9px;
    height: 9px;
    border: 1px solid ${colors.purple};
    border-radius: 5px;
    background-color: ${colors.white};
    z-index: 10;

    ${props =>
        props.status &&
        css`
            background-color: ${colors.purple};
        `}
`;

export const OrderProgressRow = styled.View`
    position: absolute;
    top: 4px;
    left: -450%;
    width: 500%;
    height: 1px;
    background-color: ${colors.purple};
`;

export const OrderProgressItemText = styled.Text`
    font-size: 8px;
    font-weight: 400;
    color: ${colors.gray};
    text-align: center;
    margin-top: 10px;
    max-width: 50px;
`;

export const OrderData = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding: 20px;
    background-color: ${colors.grayf8};
`;

export const OrderDataItem = styled.View``;

export const OrderDataTitle = styled.Text`
    font-size: 8px;
    font-weight: 700;
    color: ${colors.gray};
`;

export const OrderDataText = styled.Text`
    font-size: 12px;
    font-weight: 700;
    color: ${colors.gray44};
`;

export const OrderCanceled = styled.Text`
    padding-left: 20px;
    color: ${colors.red};
    font-weight: 700;
    font-size: 12px;
`;

export const ButtonViewOrderText = styled.Text`
    font-size: 12px;
    font-weight: 700;
    color: ${colors.purple};
`;
