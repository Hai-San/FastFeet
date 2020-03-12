import styled from 'styled-components';
import colors from '~/styles/colors';

export const PageContainer = styled.div`
    position: relative;
    height: 100%;

    .loadingScreen {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        display: none;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);

        &[data-loading='true'] {
            display: flex;
        }
    }

    .orderDeliveryer {
        display: flex;
        align-items: center;

        .deliveryer_avatar {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            overflow: hidden;
        }

        img {
            max-width: 100%;
        }

        .sb-avatar {
            border-radius: 50%;
            overflow: hidden;
        }

        > span {
            margin-left: 5px;
        }
    }

    .status {
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
    }
`;
