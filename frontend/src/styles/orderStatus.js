import styled from 'styled-components';
import colors from './colors';

export const OrderStatus = styled.div`
    display: inline-block;
    border-radius: 25px;
    padding: 3px 8px 3px 8px;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;

    &:before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 6px;
    }

    &[data-status='entregue'] {
        color: ${colors.green};
        background-color: ${colors.greenLight};

        &:before {
            background-color: ${colors.green};
        }
    }

    &[data-status='retirada'] {
        color: ${colors.blue};
        background-color: ${colors.blueLight};

        &:before {
            background-color: ${colors.blue};
        }
    }

    &[data-status='cancelada'] {
        color: ${colors.red};
        background-color: ${colors.redLight};

        &:before {
            background-color: ${colors.red};
        }
    }

    &[data-status='pendente'] {
        color: ${colors.yellow};
        background-color: ${colors.yellowLight};

        &:before {
            background-color: ${colors.yellow};
        }
    }
`;
