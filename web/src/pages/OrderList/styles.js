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
`;
