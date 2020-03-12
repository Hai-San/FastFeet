import styled from 'styled-components';

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
`;
