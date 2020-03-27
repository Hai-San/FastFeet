import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
    .loadingScreen {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        display: none;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 450px;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.2);

        &[data-loading='true'] {
            display: flex;
        }

        svg {
            color: ${colors.gray};
            animation: rotating 1.25s linear infinite;
        }
    }

    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
